//deklarasikan package/module yang digunakan
const cheerio = require("cheerio");
const fetch = require("node-fetch");

//setelah di deklarasikan kita gunakan

//array tampung
let listTitle = [];
let listUrl = [];
let result = [];

fetch("http://cerpenmu.com/")
  .then((res) => res.text())
  //kita jadikan text
  .then((data) => {
    let $ = cheerio.load(data);
    // let title = $("title")
    //jika ingin mencari tag seperti head,a cukup tuliskan tagnya
    //kalau mau mencari class bisa tulis dengan diawali titik, contoh : $(".post") atau $("div[class=post]")

    // console.log(title.text())
    //sebelum di console log kita ubah jadi text biasa menggunakan fungsi .text()

    $("article[class=post]").each(function () {
      let judul = $(this).find("h2").text();
      listTitle.push(judul);

      let url = $(this).find("a").attr("href");
      listUrl.push(url);
      //cari element a, ambil attribut href
      //attr berfungsi mengambil sebuah atribut didalam element

      //oke kita udah dapet judul, kita masukkan ke array kosong
      //gunakan fungsi push

      //nah this ini maksudnya itu kayak yang ada di dalam article ber class post, isinya yaitu
      //kalo gapaham coba aja dulu, nanti juga paham, saya juga awalnya gtu,
      //palagi liat tutorial dari arugaz, bingung dah lu

      //find fungsi nya kayak mencari di dalam.
      //kita akan mencari element h2
      //dan akan kita jadikan teks biasa menggunakan fungsi .text()
    });
    delete listTitle[0];
    delete listUrl[0];
    //disini kita hapus semua index 0 karena index 0 itu isinya kosong

    for (i in listTitle) {
      result.push({
        title: listTitle[i],
        url: listUrl[i],
      });
    }
    console.log(result);
  });
