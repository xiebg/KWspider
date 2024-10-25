import time
import execjs
import requests
import os
import random
import string
#pn页码   rn=30每页30首   reqId歌曲id
headers ={
    "Referer": "http://www.kuwo.cn/rankList",
    "Cookie": "_ga=GA1.2.1792987869.1707664785; _ga_ETPBRPM9ML=GS1.2.1707664785.1.1.1707664787.58.0.0; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1707664785,1707917632; _gid=GA1.2.627378566.1707917632; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1707917657; _gat=1; Hm_Iuvt_cdb524f42f0cer9b268e4v7y735ewrq2324=NjxjptKPGpAArDF3M3zGCsnQxKHhECKK",
    "Host": "www.kuwo.cn",
    "csrf": "M05N2AIFFIK",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36 Edg/91.0.864.48"

}
# counter = 1


def generate_random_string(length=16):
    """生成一个指定长度的随机字符串，包含大小写字母和数字。"""
    characters = string.ascii_letters + string.digits
    return ''.join(random.choices(characters, k=length))

def replace_non_gbk_chars(input_str):
    try:
        # 尝试使用GBK编码字符串
        input_str.encode('gbk')
        return input_str
    except UnicodeEncodeError:
        # 如果出现编码错误，说明字符串中包含无法用GBK编码的字符
        # 生成一个随机的16位字符字符串来替代
        return generate_random_string(16)
def get_list(num,word):
    url = f"https://bd.kuwo.cn/search/searchMusicBykeyWord?vipver=1&client=kt&ft=music&cluster=0&strategy=2012&encoding=utf8&rformat=json&mobi=1&issubtitle=1&show_copyright_off=1&pn={num}&rn=20&all={word}"
    resp = requests.get(url,headers = headers).json()
    lists = resp["abslist"]
    print("本页数量：",len(lists))
    for lis in lists:
        # print(lis["ALBUM"])
        title = lis["ALBUM"].replace("?","").replace(":","").replace("\\","").replace("/","").replace("*","").replace('"',"").replace("<","").replace(">","").replace("|","")
        artist = lis["ARTIST"].replace("?","").replace(":","").replace("\\","").replace("/","").replace("*","").replace('"',"").replace("<","").replace(">","").replace("|","")
        if title == "":
            title = lis["NAME"].replace("?","").replace(":","").replace("\\","").replace("/","").replace("*","").replace('"',"").replace("<","").replace(">","").replace("|","")
            if title == "":
                title = lis["SONGNAME"].replace("?","").replace(":","").replace("\\","").replace("/","").replace("*","").replace('"',"").replace("<","").replace(">","").replace("|","")
        name = f"{title}-{artist}"
        name = replace_non_gbk_chars(name)
        rid = lis["DC_TARGETID"]
        # print(name)
        get_mp3(rid,name)
        # break
        print("="*20)


def get_mp3(rid,title):
    # 进行密码逆向
    node = execjs.get()
    ctx = node.compile(open("./getReqId.js", encoding="utf-8").read())
    ReqId = ctx.eval("main()")
    # cxt1 = node.compile(open("./getSecret.js", encoding="utf-8").read())
    # funcName = "getSecret('{0}')".format("")
    # Secret = cxt1.eval("getSecret()")
    # print(Secret,ReqId)
    Secret = "4931ed915c4f2e48bb1092d40efdc6404a85b4b34094da5d63e938fcf5b437cb02cf864e"
    url1 = f"https://bd.kuwo.cn/api/v1/www/music/playUrl?mid={rid}&type=music&httpsStatus=1&reqId={ReqId}&plat=web_www&from="
    head0 = {
        "accept-encoding":"gzip, deflate, br, zstd",
        "accept-language":"zh-CN,zh;q=0.9",
        "connection":"keep-alive",
        "cookie":"Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1728307873; HMACCOUNT=218BE82E470F3252; _ga=GA1.2.578065820.1728307873; _gid=GA1.2.1885617998.1728307873; _gat=1; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1728311544; _ga_ETPBRPM9ML=GS1.2.1728311051.2.1.1728311544.53.0.0; Hm_Iuvt_cdb524f42f23cer9b268564v7y735ewrq2324=jaf3MhFce52EEGwmBJEdwnFZjiCes2RG",
        "host":"bd.kuwo.cn",
        "referer":f"https://bd.kuwo.cn/play_detail/{rid}",
        "secret":Secret,
        "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0"
    }
    resp = requests.get(url1, headers=head0).json()
    try:
        print(resp["data"]["url"])
        url2 = resp["data"]["url"]
    except Exception as e:
        print("付费音乐无法下载：",title)
        url2 = f"https://bd.kuwo.cn/play_detail/{rid}"
        print(url2)
        state = "会员音乐无法下载"
        save_txt(title, url2 , state)
        return
    try:
        state = save_date(title, url2)
        if state == "数据异常未保存":
            url2 = f"https://bd.kuwo.cn/play_detail/{rid}"
        save_txt(title, url2, state)
    except Exception as e:
        print(e)
        print(title, url2)


def save_txt(title,url,state="正常"):
    path = "歌曲/" +word
    if os.path.exists(path) == False:
        print("正在创建", path, "文件夹")
        os.makedirs(path)
    try:
        with open(f"{path}/{word}.csv", "a") as f:
            # f.write(f"{counter},{title}, {url}")
            f.write(f"{title}, {url}, {state}")
            f.write("\n")
    except Exception as e:
        print(e)
        print(url)
        print("=====================")
def save_date(title,url):
    headers={
"authority": "rn01-sycdn.kuwo.cn",
"method": "GET",
"path": url,
"scheme": "https",
"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
"accept-encoding": "gzip, deflate, br",
"accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
"cache-control": "no-cache",
"cookie": "_ga=GA1.2.340260792.1623853001; _gid=GA1.2.1623149410.1623853001; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1623853001,1623931172; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1623931172",
"pragma": "no-cache",
"sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Microsoft Edge\";v=\"91\", \"Chromium\";v=\"91\"",
"sec-ch-ua-mobile": "?0",
"sec-fetch-dest": "document",
"sec-fetch-mode": "navigate",
"sec-fetch-site": "none",
"sec-fetch-user": "?1",
"upgrade-insecure-requests": "1",
"user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36 Edg/91.0.864.48"
}
    path = "歌曲/" +word
    if os.path.exists(path) == False:
        print("正在创建", path, "文件夹")
        os.makedirs(path)
    try:
        content = requests.get(url, headers=headers).content
        if len(content) <= 1000:
            print(f"{title}.mp3==>数据异常未保存,请手动保存：",url)
            state = "数据异常"
            return state
        # with open(f"{path}/{counter} {title}.mp3", "wb") as f:
        #     f.write(content)
        #     print(f"{path}/{counter} {title}.mp3","保存完毕！！！")
        with open(f"{path}/{title}.mp3", "wb") as f:
            f.write(content)
            print(f"{path}/{title}.mp3","保存完毕！！！")
        state = "正常"
        return state
    except Exception as e:
        print(e)
        print(url)
        state = "下载失败"
        return state

if __name__ == '__main__':
    word = input("请输入歌手或歌名：")
    ye = input("请输入爬取的页数：")
    for i in range(1, (int(ye) + 1)):
        print("正在爬取第" + str(i) + "页：")
        get_list(i,word)
        # counter += 1
    print("全部爬取完成！！！！！")
    time.sleep(5)






# print(get_secret())