//Api ==>   https://api.banghasan.com/sholat/format/json/jadwal/kota/703/tanggal/2017-02-07
// macam kota  =>  https://api.banghasan.com/sholat/format/json/kota

"use strict"

//dekl 
const hamburgerMenu = document.querySelector(".hamburger-menu");
const navigasi = document.querySelector(".navigasi");
const searchKota = document.querySelector(".cariKota");

//membuat nav fixed ketika di scroll
window.onscroll = function(){
     const header = document.querySelector('header');
     const fixedNav = header.offsetTop;
     if(window.pageYOffset > fixedNav){
          header.classList.add("navbar-fixed");
     }else{
          header.classList.remove("navbar-fixed");
     }
}
// hambugermenu ketika di klik
hamburgerMenu.addEventListener("click", () => {
     hamburgerMenu.classList.toggle("tombol");  //membuat tombol
     if(navigasi.classList[0] === "hidden"){
          navigasi.classList.replace("hidden","flex");
     }else if(navigasi.classList[0] === "flex"){
          navigasi.classList.replace("flex","hidden");
     }
})

const date = new Date();
const cekTahun = date.getFullYear();   // untuk tahun
const cekBulan = date.getMonth()+1;     // untuk bulan
const cekHari = date.getDate();         //untuk hari
// console.log(cekBulan)
let bulan = 0;
let hari=0;

//membuat 2digit number
if(cekBulan < 10){
     bulan = "0"+cekBulan;
}if(cekHari < 10){
     hari = "0"+ cekHari
}if(cekHari >= 10){
     hari = cekHari;
}if(cekBulan >= 10){
     bulan = cekBulan;
}

const tanggal =cekTahun + "-" +bulan+"-"+hari;
const namaBulan = ["januari","februari","maret","april","mei","juni","juli","agustus","september","november","desember"]
document.querySelector(".tanggal").innerText = hari + " - "+ namaBulan[cekBulan-1] + " - " + cekTahun

//membuat jam
function jamIni (){
     const jam =new Date().getHours();       //untuk  perjam
     const menit =new Date().getMinutes();   //Untuk permenit
     const detik = new Date().getSeconds();  //untuk perdetik
     if(jam < 10){
          document.querySelector(".jam").textContent = "0"+ jam;
     }if(menit < 10){
          document.querySelector(".menit").textContent = "0"+ menit;
     }if(detik < 10){
          document.querySelector(".detik").textContent = "0"+ detik;
     }if(jam >= 10){
          document.querySelector(".jam").textContent =  jam;
     }if(menit >= 10){
          document.querySelector(".menit").textContent =  menit;
     }if(detik >= 10){
          document.querySelector(".detik").textContent = detik;
     }
}

// ini digunakan seperti pembahruan
setInterval(() => {
     jamIni();
     getJadwal();
     document.querySelector(".namaKota").innerText = localStorage.namaKota;
}, 1000);
const numberLocal = localStorage.idKota;

//membuat jadwal
function getJadwal(){
     //ini api jadwal  
     fetch(`https://api.banghasan.com/sholat/format/json/jadwal/kota/${numberLocal}/tanggal/${tanggal}`)
     .then((response) => response.json())
     .then((data) => {
          const jadwalSholat = data.jadwal.data;
          document.querySelector(".subuh").innerHTML = jadwalSholat.subuh;
          document.querySelector(".imsak").innerHTML = jadwalSholat.imsak;
          document.querySelector(".terbit").innerHTML = jadwalSholat.terbit;
          document.querySelector(".dzuhur").innerHTML = jadwalSholat.dzuhur;
          document.querySelector(".ashar").innerHTML = jadwalSholat.ashar;
          document.querySelector(".maghrib").innerHTML = jadwalSholat.maghrib;
          document.querySelector(".isya").innerHTML = jadwalSholat.isya;
     })
}

//mencari nama kota
searchKota.addEventListener("keyup", function(e){
     //ambil value
     const value = e.target.value.length;
     const searchKota = document.querySelector(".cariKota");
     const listGroup = document.querySelector(".list-group");
     listGroup.classList.remove("hidden") 
     //jika value input > 0                  
     if(value > 0 ){
          //api kota
          fetch(`https://api.banghasan.com/sholat/format/json/kota`)
          .then((response) => response.json())
          .then((namakota ) => {
               const semuaKota = namakota.kota;
               let kota ="";
               semuaKota.forEach(descKota => {                                                                          //data set 
                    kota += `<a class="border ring-1 ring-indigo-300 p-3 cursor-pointer" id="nama-kota" data-idKota="${descKota.id}" >${descKota.nama}</a>` 
               });
               listGroup.innerHTML = kota;
               const daerah = document.querySelectorAll("#nama-kota");
               //mengklik box kota
               daerah.forEach(event => {
                    //membuat fitur cari berdasarkan huruf
                    const ambilText = searchKota.value.toLowerCase();
                    const itemKota = event.firstChild.textContent.toLowerCase();
                    if(itemKota.indexOf(ambilText) != -1){
                         event.setAttribute("style","display: flex");
                    }else{
                         event.setAttribute("style","display:none !important");
                    }
                    //box kota ketika diklik
                    event.addEventListener("click",(e)=> {
                         const idKota =e.target.dataset.idkota;
                         const judul = e.target.textContent;
                         window.localStorage.setItem("idKota",idKota);
                         window.localStorage.setItem("namaKota",judul);
                         listGroup.classList.add("hidden");
                         searchKota.value=""                  
                    })
               })
            }
          )
     }else{

     }
})

// getJadwal();