import { createAnimation, IonActionSheet, IonBadge, IonButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCol, IonContent, IonFab, IonFabButton, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonInfiniteScroll, IonInfiniteScrollContent, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLoading, IonModal, IonPage, IonRefresher, IonRefresherContent, IonRippleEffect, IonRow, IonSearchbar, IonSegment, IonSegmentButton, IonText, IonTextarea, IonTitle, IonToast, IonToolbar, RefresherEventDetail, useIonViewWillEnter } from '@ionic/react';
import { add, addCircleOutline, bookmarkSharp, briefcaseSharp, callOutline, callSharp, checkmarkCircleOutline, chevronBackOutline, closeCircleOutline, documentOutline, documentTextOutline, ellipsisVerticalOutline, logOutOutline, mailSharp } from 'ionicons/icons';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Beranda.css';
import $ from 'jquery';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { CallNumber } from '@awesome-cordova-plugins/call-number'
import { LottieLoading } from './lottieAnimation';

const Beranda: React.FC = () => {
  const [isInfiniteDisabled, setInfiniteDisabled] = useState(false);
  const [isModalTambahCalonCustomer, setIsModalTambahCalonCustomer] = useState(false)
  const [isModalTambahAktivitas, setIsModalTambahAktivitas] = useState(false)
  const [isModalLogAktivitas, setIsModalLogAktivitas] = useState(false)
  const [isModalPassword, setIsModalPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isToast, setIsToast] = useState(false)
  const [isToastMessage, setIsToastMessage] = useState('')
  const [isToastColor, setIsToastColor] = useState('')
  const [isToastDuration, setIsToastDuration] = useState(Number)
  const [add64Foto, setadd64Foto] = useState('')
  const [add64FotoNama, setAdd64FotoNama] = useState('')
  const [add64FotoType, setAdd64FotoType] = useState('')
  const [dataAktivitas, setDataAktivitas] = useState([])
  const [dataLogAktivitas, setDataLogAktivitas] = useState([])
  const [dataAktivitasOrigin, setDataAktivitasOrigin] = useState([])
  const [dataLogAktivitasOrigin, setDataLogAktivitasOrigin] = useState([])
  const [isActionDetail, setIsActionDetail] = useState(false)
  const [isActionDetail2, setIsActionDetail2] = useState(false)
  const [isSelectPhone, setIsSelectPhone] = useState('')
  const [isSelectUserId, setIsSelectUserId] = useState('')
  const [isSelectEmail, setIsSelectEmail] = useState('')
  const [isSelectNama, setIsSelectNama] = useState('')
  const [isSelectStatus, setIsSelectStatus] = useState('')
  const [isOpen, setIsOpen] = useState('caloncustomer')
  const [dataCalonCustomer, setDataCalonCustomer] = useState([])
  const [dataCustomer, setDataCustomer] = useState([])
  const [dataCalonCustomerOrigin, setDataCalonCustomerOrigin] = useState([])
  const [dataCustomerOrigin, setDataCustomerOrigin] = useState([])
  const [isSelectSegment, setIsSelectSegment] = useState('caloncustomer')

  useIonViewWillEnter(() => {
    getDataCalonCustomer()
    getDataCustomer()
  })

  function getData(){
    let data = new FormData();
    data.append('user_id', String(localStorage.getItem('user_id')))
    $.ajax({
      type:'POST',
      url: 'https://xpdcargo.id/login/Callback2/apiGetCustomer',
      dataType:'JSON',
      data:data,
      processData:false,
      contentType:false,
      beforeSend:function(){
        setDataAktivitas([])
        setIsLoading(true)
      },
      success:function(r:any){
        setIsLoading(false)
        setDataAktivitas(r.data)
      //   setDataUser(r.data.slice(0,10))
        setDataAktivitasOrigin(r.data)
      // setDataUser(r.data.slice(0,200))
      },
      error:function(err){
        console.log(err)
        setIsLoading(false)
      }
    })
  }

  function getDataAktivitas(){
    let data = new FormData();
    data.append('user_id', isSelectUserId)
    $.ajax({
      type:'POST',
      url: 'https://xpdcargo.id/login/Callback2/apiGetAktivitas',
      dataType:'JSON',
      data:data,
      processData:false,
      contentType:false,
      beforeSend:function(){
        setDataLogAktivitas([])
        setIsLoading(true)
      },
      success:function(r:any){
        setIsLoading(false)
        setDataLogAktivitas(r.data)
      //   setDataUser(r.data.slice(0,10))
        setDataLogAktivitasOrigin(r.data)
      // setDataUser(r.data.slice(0,200))
      },
      error:function(err){
        console.log(err)
        setIsLoading(false)
      }
    })
  }

  const inAnimation = (baseEl: HTMLElement) => {
    const root = baseEl.shadowRoot;
    const backdropAnimation = createAnimation()
      .addElement(root?.querySelector('ion-backdrop')!)
      .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');
    const wrapperAnimation = createAnimation()
        .addElement(root?.querySelector('.modal-wrapper')!)
        .keyframes([
            { offset: 0, opacity: '0', transform: 'translateX(100%)' },
            { offset: 1, opacity: '0.99', transform: 'translateX(0)' },
        ]);
    return createAnimation()
      .addElement(baseEl)
      .easing('ease-out')
      .duration(250)
      .addAnimation([backdropAnimation, wrapperAnimation]);
  };
  const outAnimation = (baseEl: HTMLElement) => {
      return inAnimation(baseEl).direction('reverse');
  };
  document.addEventListener('backbutton', function(event) {
    event.stopImmediatePropagation()
    event.stopPropagation()
  }, false);


  function onSelectFile(type:any){
    if(type === 'Foto'){var file = $("input[name='fileFoto']").prop('files')}
    if(String(file[0].type) === 'application/pdf' || String(file[0].type) === 'image/png' || String(file[0].type) === 'image/jpeg'){
      getBase64(file[0]).then((res) => {
        if(type === 'Foto'){
          setadd64Foto(String(res))
          setAdd64FotoNama(String(file[0]['name']))
          setAdd64FotoType(String(file[0]['type']))
        }
      })
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
      }, 3000);
    }else{
      showToast('File harus berformat PDF/JPEG/PNG', 'danger', 1700)
    }
  }

  function showToast(message:any, color:any, duration:any){
    setIsToastMessage(message)
    setIsToastColor(color)
    setIsToastDuration(Number(duration))
    setIsToast(true)
  }
  function selectFile(type:any){
    if(type === 'Foto'){$("#fileFoto").click()}
  }

  function getBase64(file:File) {
    return new Promise(resolve => {
        let baseURL = "";
        // Make new FileReader
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            // console.log(reader.result);
            baseURL = String(reader.result)
            resolve(baseURL);
        };
    });
  }

  function onDeleteFile(type:any){
    if(type === 'Foto'){
      setadd64Foto('')
      setAdd64FotoNama('')
    }
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }

  function doLogout(){
    localStorage.removeItem('userid')
    localStorage.setItem('isLogin', '0')
    localStorage.setItem('last_menu', 'Login')
    localStorage.setItem('isActive', '0')
    window.open('/Login','_self')
}


function doTambahCust(){
  var data = new FormData()
  var namacustomer = String($("ion-input[name='nama_customer']").val())
  var phonecustomer = String($("ion-input[name='phone_customer']").val())
  var emailcustomer = String($("ion-input[name='email_customer']").val())
  var perusahaan = String($("ion-input[name='perusahaan']").val())
  var keterangan = String($("ion-textarea[name='keterangan']").val())
  data.append('user_id',  String(localStorage.getItem('user_id')))
  data.append('nama_customer', namacustomer)
  data.append('phone_customer', phonecustomer)
  data.append('email_customer', emailcustomer)
  data.append('perusahaan', perusahaan)
  data.append('keterangan', keterangan)
  data.append('base64Foto',String(add64Foto))
  data.append('base64FotoType',String(add64FotoType))
  addLog(`${localStorage.getItem('nama')} telah menambahkan calon customer atas nama ${namacustomer}`)
  $.ajax({
    type: "POST",
    url: "https://xpdcargo.id/login/Callback2/apiTambahCustomer",
    data: data,
    processData:false,
    contentType:false,
    dataType: "JSON",
    beforeSend:function(){
      setIsLoading(true)
    },
    success:function(r:any){
      setIsLoading(false)
      getData()
      getDataCalonCustomer()
      setIsModalTambahCalonCustomer(false)
      showToast('Tambah Data Calon Customer Berhasil', 'success', 1500)
    },
    error:function(err){
      console.log(err)
      setIsLoading(false)
      showToast('Tambah data calon customer kamu gagal, periksa koneksi internet kamu', 'danger', 2000)
    }
  })
}

function doTambahAktivitas(){
  var data = new FormData()
  var user_id = String($("ion-input[name='user_id']").val())
  var message = String($("ion-input[name='message']").val())
  data.append('user_id',  String(isSelectUserId))
  data.append('message', message)
  addLog(`${localStorage.getItem('nama')} telah menambahkan aktivitas untuk customer ${isSelectNama}`)
  $.ajax({
    type: "POST",
    url: "https://xpdcargo.id/login/Callback2/apiAddActivity",
    data: data,
    processData:false,
    contentType:false,
    dataType: "JSON",
    beforeSend:function(){
      setIsLoading(true)
    },
    success:function(r:any){
      setIsLoading(false)
      getDataAktivitas()
      setIsModalTambahAktivitas(false)
      showToast('Tambah Aktivitas Berhasil', 'success', 1500)
    },
    error:function(err){
      console.log(err)
      setIsLoading(false)
      showToast('Tambah aktivitas kamu gagal, periksa koneksi internet kamu', 'danger', 2000)
    }
  })
}

function refreshData(event: CustomEvent<RefresherEventDetail>) {
  getDataCalonCustomer()
  getDataCustomer()
  setTimeout(() => {
    event.detail.complete();
  }, 1500);
}

function refreshDataLog(event: CustomEvent<RefresherEventDetail>) {
  getDataAktivitas()
  setTimeout(() => {
    event.detail.complete();
  }, 1500);
}

const buttonSheet = () => {
    var btn = 
    [
      {
        text: "Log Aktivitas",
        handler:()=>{
          openModalAktivitas()
        }
      },
      {
        text: "Tambah Aktivitas",
        handler:()=>{
          setIsModalTambahAktivitas(true)
        }
      },
      {
        text: `Tambah Customer`,
        handler:()=>{
          if(isSelectStatus === '1'){//jika sudah jadi customer
            showToast('Sudah menjadi customer kamu', 'medium', 1200)
          }else{
            setIsModalPassword(true)
          }
        }
      },
      {
        text: 'Hubungi Customer',
        handler:()=>{
          addLog(`${localStorage.getItem('nama')} telah menghubungi calon customer ${isSelectNama} dengan nomor ${isSelectPhone}`)
          doCall(isSelectPhone)
        }
      },
      {
        text: 'Kirim Email',
        handler:()=>{
          addLog(`${localStorage.getItem('nama')} telah menghubungi calon customer ${isSelectNama} dengan email ${isSelectEmail}`)
          doEmail(isSelectEmail)
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        data: {
          action: 'cancel',
        },
      },
     
      ]
      return btn
    }
    
    const buttonSheet2 = () => {
      var btn = 
      [
        {
          text: "Log Aktivitas",
          handler:()=>{
            openModalAktivitas()
          }
        },
        {
          text: 'Hubungi Customer',
          handler:()=>{
            addLog(`${localStorage.getItem('nama')} telah menghubungi customer ${isSelectNama} dengan nomor ${isSelectPhone}`)
            doCall(isSelectPhone)
          }
        },
        {
          text: 'Kirim Email',
          handler:()=>{
            addLog(`${localStorage.getItem('nama')} telah menghubungi customer ${isSelectNama} dengan email ${isSelectEmail}`)
            doEmail(isSelectEmail)
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
       
        ]
        return btn
      }
      

    function doCall(phone:any){
      CallNumber.callNumber(phone, true).then((res) => {
        setIsLoading(true)
        setTimeout(() => {
          setIsLoading(false)
        }, 1200);
      }).catch((err)=>{
        console.log(err)
        showToast('Gagal melakukan panggilan darurat!, nomor tidak valid', 'danger', 1200)
      })
    }

    function doEmail(email:any){
      window.open(`mailto:${email}`,'_blank')
    }

    function openModalAktivitas(){
      let data = new FormData()
      data.append('user_id', isSelectUserId)
      $.ajax({
        type: "POST",
        url: "https://xpdcargo.id/login/Callback2/apiGetAktivitas",
        data: data,
        processData: false,
        contentType: false,
        dataType: "JSON",
        beforeSend:function(){
          setIsLoading(true)
        },
        success:function(r:any){
          setIsLoading(false)
          setDataLogAktivitas(r.data)
          setIsModalLogAktivitas(true)
        },
        error:function(err){

        }
      })
      
    }

    function openAction(phone:any, user_id:any, email:any, nama_customer:any, status:any){
      setIsSelectStatus(status)
      setIsSelectPhone(phone)
      setIsSelectUserId(user_id)
      setIsSelectEmail(email)
      setIsSelectNama(nama_customer)
      setIsActionDetail(true)
    }

    function openActionCustomer(phone:any, user_id:any, email:any, nama_customer:any, status:any){
      setIsSelectStatus(status)
      setIsSelectPhone(phone)
      setIsSelectUserId(user_id)
      setIsSelectEmail(email)
      setIsSelectNama(nama_customer)
      setIsActionDetail2(true)
    }

    function doCustomer(){
      addLog(`${localStorage.getItem('nama')} telah menambahkan ${isSelectNama} sebagai customer`)
      var data = new FormData()
      var namacustomer = String($("ion-input[name='name']").val())
      var phonecustomer = String($("ion-input[name='phone']").val())
      var emailcustomer = String($("ion-input[name='email']").val())
      var passwordcustomer = String($("ion-input[name='password']").val())
      data.append('name', namacustomer)
      data.append('phone', phonecustomer)
      data.append('email', emailcustomer)
      data.append('password', passwordcustomer)
      data.append('id', isSelectUserId)
      if(passwordcustomer !== ''){
        $.ajax({
          type: "POST",
          url: "https://xpdcargo.id/login/Callback2/apiCalonCust",
          data: data,
          processData:false,
          contentType:false,
          dataType: "JSON",
          beforeSend:function(){
            setIsLoading(true)
          },
          success:function(r:any){
            setIsLoading(false)
            if(r.code === 200){
              getData()
              getDataCalonCustomer()
              setIsModalPassword(false)
              showToast('Tambah Customer Berhasil', 'success', 1500)
            }else{
              showToast(r.message, 'danger', 1500)
            }
          },
          error:function(err){
            console.log(err)
            setIsLoading(false)
            showToast('Data Customer gagal ditambahkan', 'danger', 2000)
          }
        })
      }else{
        setIsLoading(false)
        showToast('Password Tidak Boleh Kosong', 'danger', 2000)
      }
    }

    const pushData = () => {
      if(isOpen === 'caloncustomer'){
          var max = dataCalonCustomer.length + 10;
          setDataCalonCustomer(dataCalonCustomerOrigin.slice(0, max))
      }
      if(isOpen === 'customer'){
          var max = dataCustomer.length + 10;
          setDataCustomer(dataCustomerOrigin.slice(0, max))
      }
  }

    const loadData = (ev: any) => {
      setTimeout(() => {
          pushData();
          ev.target.complete();
          if(isOpen === 'caloncustomer'){
              if(dataCalonCustomer.length === 1000){
                  setInfiniteDisabled(true)
              }
          }
          if(isOpen === 'customer'){
              if(dataCustomer.length === 1000){
                  setInfiniteDisabled(true)
              }
          }
      },500);
  }
  function getDataCalonCustomer(){
    let data = new FormData();
    data.append('isCustomer', '0')
    $.ajax({
      type:'POST',
      url: 'https://xpdcargo.id/login/Callback2/apiGetCustomer',
      dataType:'JSON',
      data:data,
      processData:false,
      contentType:false,
      beforeSend:function(){
        setDataCalonCustomer([])
        setIsLoading(true)
      },
      success:function(r:any){
        setIsLoading(false)
        setDataCalonCustomer(r.data.slice(0,5))
      //   setDataUser(r.data.slice(0,10))
        setDataCalonCustomerOrigin(r.data)
      // setDataUser(r.data.slice(0,200))
      },
      error:function(err){
        console.log(err)
        setIsLoading(false)
      }
    })
  }
  function getDataCustomer(){
    let data = new FormData();
    data.append('isCustomer', '1')
    $.ajax({
      type:'POST',
      url: 'https://xpdcargo.id/login/Callback2/apiGetCustomer',
      dataType:'JSON',
      data:data,
      processData:false,
      contentType:false,
      beforeSend:function(){
        setDataCustomer([])
        setIsLoading(true)
      },
      success:function(r:any){
        setIsLoading(false)
        setDataCustomer(r.data.slice(0,5))
      //   setDataUser(r.data.slice(0,10))
        setDataCustomerOrigin(r.data)
      // setDataUser(r.data.slice(0,200))
      },
      error:function(err){
        console.log(err)
        setIsLoading(false)
      }
    })
  }

  function addLog(pesan:any){
    let data = new FormData()
    data.append('user_id', String(localStorage.getItem('user_id')))
    data.append('message', String(pesan))
    $.ajax({
      type: "POST",
      url: "https://xpdcargo.id/login/Callback2/addLogSales",
      data: data,
      processData: false, 
      contentType: false,
      dataType: "JSON"
    })
  }

  function search(cari:any){
    if(String(cari).trim() !== ''){
      if(isSelectSegment === 'Calon Customer'){
        var filterdata = dataCalonCustomer.filter(function(datafilter){
            return String(datafilter['nama_customer']).toLowerCase().includes(String(cari).toLowerCase()) || String(datafilter['email']).toLowerCase().includes(String(cari).toLowerCase()) || String(datafilter['phone']).toLowerCase().includes(String(cari).toLowerCase()) || String(datafilter['perusahaan']).toLowerCase().includes(String(cari).toLowerCase()) || String(datafilter['keterangan']).toLowerCase().includes(String(cari).toLowerCase())
        })
        setDataCalonCustomer(filterdata)
      }else{
        var filterdata = dataCustomer.filter(function(datafilter){
            return String(datafilter['nama_customer']).toLowerCase().includes(String(cari).toLowerCase()) || String(datafilter['email']).toLowerCase().includes(String(cari).toLowerCase()) || String(datafilter['phone']).toLowerCase().includes(String(cari).toLowerCase()) || String(datafilter['perusahaan']).toLowerCase().includes(String(cari).toLowerCase()) || String(datafilter['keterangan']).toLowerCase().includes(String(cari).toLowerCase())
        })
        setDataCustomer(filterdata)
      }
    }
    if(String(cari).trim() === ''){
      setDataCustomer(dataCustomerOrigin)
      setDataCalonCustomer(dataCalonCustomerOrigin)
    }
  }

  function doSelectSegment(val:any){
    setIsSelectSegment((val === 'caloncustomer')?'Calon Customer':'Customer')
    setIsOpen(String(val))
  }

  function report(){
    let data = new FormData()
    data.append('user_id',String(localStorage.getItem('user_id')))
    $.ajax({
      type: "POST",
      url: "https://xpdcargo.id/login/Callback2/apiReport",
      data: data,
      processData: false, 
      contentType: false,
      dataType: "HTML"
    })
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Beranda</IonTitle>
          <IonButtons slot='end' onClick={()=>{doLogout()}}>
              <IonButton mode='ios' fill='clear' color='dark'>
                  <IonIcon icon={logOutOutline}></IonIcon>
              </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonGrid style={{background:"#FFFFFF"}}>
          <IonRow>
            <IonCol size='12' style={{textAlign:"end"}} onClick={()=>window.open(`https://xpdcargo.id/login/Callback2/apiReport?user_id=${localStorage.getItem('user_id')}`, '_blank')}>
                <IonButton color='danger' mode='ios' size='small' style={{textAlign:"end"}}>Report</IonButton>
            </IonCol>
            <IonCol size='12'>
              <IonSegment  mode='ios' onIonChange={(e) => {doSelectSegment(e.detail.value)}} value={isOpen} swipe-gesture={true} select-on-focus={false}>
                  <IonSegmentButton value="caloncustomer">
                      <IonText mode='ios' style={{margin:"10px 0", fontSize:"16px"}}>
                          Calon Customer
                      </IonText>
                  </IonSegmentButton>
                  <IonSegmentButton value="customer">
                      <IonText mode='ios' style={{margin:"10px 0", fontSize:"16px"}}>
                          Customer
                      </IonText>
                  </IonSegmentButton>
              </IonSegment>
            </IonCol>
            <IonCol size='12' style={{background:"transparent"}}>
              <IonSearchbar mode='ios' inputMode='search' placeholder={`Cari Data ${isSelectSegment}`} onIonChange={(e)=>{search(String(e.detail.value))}} onIonClear={(e)=>{search('')}} style={{margin:0}} id='search'/>
            </IonCol>
          </IonRow>
        </IonGrid>

      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={refreshData}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
          <IonGrid style={{background:"white", padding:"5px 10px"}}>
                {(isOpen === 'caloncustomer')?
                dataCalonCustomer.map((a, index) => {
                    return(
                      <IonCard key={index} style={{borderRadius:"10px", margin:"5px", border:"1px solid rgba(31, 134, 255, 0.5)"}}>
                      <IonCardContent>
                        <IonRow>
                          <IonCol size='5' style={{fontSize:"14px", marginBottom:"0", paddingBottom:"0",paddingTop:"0", marginTop:0}}>
                            <IonText mode='ios' style={{fontSize:"14px", fontWeight:"bold"}}>
                              {a['nama_customer']}
                            </IonText>
                          </IonCol>
                          <IonCol size='6' style={{fontSize:"12px", marginBottom:"0", paddingBottom:"0", textAlign:"end"}}>
                            <IonText mode='ios' style={{fontSize:"12px", textAlign:"end"}}>
                              {a['created_at']}
                            </IonText>
                          </IonCol>
                          <IonCol size='1' style={{background:"#3171e0", borderRadius:"5px", color:"#FFFFFF", textAlign:"center", marginBottom:"0", paddingBottom:"0"}} onClick={()=>{openAction(a['phone'], a['id'], a['email'], a['nama_customer'], a['isCustomer'])}}>
                            <IonIcon icon={ellipsisVerticalOutline} style={{fontSize:"14px", marginTop:"2px"}}></IonIcon>
                          </IonCol>
                          <IonCol size='5' style={{ marginTop:"0", paddingTop:"0", marginBottom:"0", paddingBottom:"0"}}>
                              <IonText mode='ios' style={{display:"flex", flexDirection:"column"}}>
                                <span style={{fontSize:"12px"}}><IonIcon icon={callSharp} style={{color:"#3171e0", fontSize:"12px"}}></IonIcon> {a['phone']}</span>
                              </IonText>
                          </IonCol>
                          <IonCol size='7' style={{marginTop:"0", paddingTop:"0", marginBottom:"0", paddingBottom:"0"}}>
                              <IonText mode='ios' style={{display:"flex", flexDirection:"column"}}>
                                <span style={{fontSize:"12px"}}><IonIcon icon={mailSharp} style={{color:"#3171e0", fontSize:"12px"}}></IonIcon> {a['email']}</span>
                              </IonText>
                          </IonCol>
                          <IonCol size='12' style={{marginTop:0, paddingTop:"0",  marginBottom:"0", paddingBottom:"0"}}>
                              <IonText mode='ios' style={{display:"flex", flexDirection:"column"}}>
                                <span style={{fontSize:"12px"}}><IonIcon icon={briefcaseSharp} style={{color:"#3171e0", fontSize:"12px"}}></IonIcon> {a['perusahaan']}</span>
                              </IonText>
                          </IonCol>
                          <IonCol size='12' style={{marginTop:0, paddingTop:"0",  marginBottom:"0", paddingBottom:"0"}}>
                              <IonText mode='ios' style={{fontSize:"12px"}}>
                              <span style={{fontSize:"12px"}}><IonIcon icon={bookmarkSharp} style={{color:"#3171e0", fontSize:"12px"}}></IonIcon> {a['keterangan']}</span>
                              </IonText>
                          </IonCol>
                          {/* <IonCol size='12' style={{marginTop:0, paddingTop:"0",  marginBottom:"0", paddingBottom:"0", textAlign:"end"}}>
                              <IonText mode='ios' style={{fontSize:"12px",textAlign:"end"}}>{(a['isCustomer'] === '0')?'Calon Customer':(a['isCustomer'] === '1')?'Customer':''}
                              </IonText>
                          </IonCol> */}
                        </IonRow>
                      </IonCardContent>
                    </IonCard>
                    )
                }):
                dataCustomer.map((a, index)=>{
                  return(
                      <IonCard key={index} style={{borderRadius:"10px", margin:"5px", border:"1px solid rgba(31, 134, 255, 0.5)"}}>
                        <IonCardContent>
                          <IonRow>
                          <IonCol size='5' style={{fontSize:"14px", marginBottom:"0", paddingBottom:"0",paddingTop:"0", marginTop:0}}>
                            <IonText mode='ios' style={{fontSize:"14px", fontWeight:"bold"}}>
                              {a['nama_customer']}
                            </IonText>
                          </IonCol>
                          <IonCol size='6' style={{fontSize:"12px", marginBottom:"0", paddingBottom:"0", textAlign:"end"}}>
                            <IonText mode='ios' style={{fontSize:"12px", textAlign:"end"}}>
                              {a['created_at']}
                            </IonText>
                          </IonCol>
                          <IonCol size='1' style={{background:"#3171e0", borderRadius:"5px", color:"#FFFFFF", textAlign:"center", marginBottom:"0", paddingBottom:"0"}} onClick={()=>{openActionCustomer(a['phone'], a['id'], a['email'], a['nama_customer'], a['isCustomer'])}}>
                            <IonIcon icon={ellipsisVerticalOutline} style={{fontSize:"14px", marginTop:"2px"}}></IonIcon>
                          </IonCol>
                            <IonCol size='5' style={{ marginTop:"0", paddingTop:"0", marginBottom:"0", paddingBottom:"0"}}>
                                <IonText mode='ios' style={{display:"flex", flexDirection:"column"}}>
                                  <span style={{fontSize:"12px"}}><IonIcon icon={callSharp} style={{color:"#3171e0", fontSize:"12px"}}></IonIcon> {a['phone']}</span>
                                </IonText>
                            </IonCol>
                            <IonCol size='7' style={{marginTop:"0", paddingTop:"0", marginBottom:"0", paddingBottom:"0"}}>
                                <IonText mode='ios' style={{display:"flex", flexDirection:"column"}}>
                                  <span style={{fontSize:"12px"}}><IonIcon icon={mailSharp} style={{color:"#3171e0", fontSize:"12px"}}></IonIcon> {a['email']}</span>
                                </IonText>
                            </IonCol>
                            <IonCol size='12' style={{marginTop:0, paddingTop:"0",  marginBottom:"0", paddingBottom:"0"}}>
                                <IonText mode='ios' style={{display:"flex", flexDirection:"column"}}>
                                  <span style={{fontSize:"12px"}}><IonIcon icon={briefcaseSharp} style={{color:"#3171e0", fontSize:"12px"}}></IonIcon> {a['perusahaan']}</span>
                                </IonText>
                            </IonCol>
                            <IonCol size='12' style={{marginTop:0, paddingTop:"0",  marginBottom:"0", paddingBottom:"0"}}>
                                <IonText mode='ios' style={{fontSize:"12px"}}>
                                <span style={{fontSize:"12px"}}><IonIcon icon={bookmarkSharp} style={{color:"#3171e0", fontSize:"12px"}}></IonIcon> {a['keterangan']}</span>
                                </IonText>
                            </IonCol>
                          </IonRow>
                        </IonCardContent>
                      </IonCard>
                  )
              })}
              
                {(isLoading === true)?
                <IonRow>
                    <IonCol size='12' style={{padding:0, margin:0}}>
                        <IonImg src={LottieLoading} style={{width:"75%", margin:"0 auto"}} />
                    </IonCol>
                    <IonCol size='12' style={{margin:"-40px 0 0 0", padding:0}}>
                        <IonText mode='ios' style={{fontSize:"16px", color:"#0000A0"}}>
                        Mohon Tunggu Sebentar
                        </IonText>
                    </IonCol>
                </IonRow>
                :''}
                <IonInfiniteScroll onIonInfinite={loadData} threshold="100px" disabled={isInfiniteDisabled}>
                    <IonInfiniteScrollContent loadingSpinner="crescent" loadingText="Memuat data.."></IonInfiniteScrollContent>
                </IonInfiniteScroll>
            </IonGrid>

        <IonModal mode='ios' isOpen={isModalTambahCalonCustomer} onDidDismiss={()=>{setIsModalTambahCalonCustomer(false)}} animated={true} enterAnimation={inAnimation} leaveAnimation={outAnimation}>
          <IonHeader mode='ios'>
            <IonToolbar mode='ios'>
              <IonButtons slot='start'>
                <IonButton mode='ios' color='primary' onClick={()=>{setIsModalTambahCalonCustomer(false)}}>
                  <IonIcon icon={chevronBackOutline} slot='start' style={{margin:0, padding:0}} />
                  BACK
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonGrid style={{padding:"10% 5%"}}>
              <IonRow>
                <IonCol size='12' style={{textAlign:"center", margin:"0 0 10px 0"}}>
                  <IonText mode='ios' style={{color:"var(--ion-color-dark-tint)", display:"flex", flexDirection:'column'}}>
                    <span style={{fontSize:"28px"}}>Calon Customer</span>
                    <span style={{fontSize:"12px", margin:"5px 0 0 0"}}>Masukkan data calon customer</span>
                  </IonText>
                </IonCol>
                <IonCol size='12' style={{background:"#EDEDED", borderRadius:"10px", padding:"5px 10px", margin:"5px 0"}}>
                  <IonInput mode='ios' inputMode='text' placeholder='Nama Customer' name='nama_customer' id='nama_customer'/>
                </IonCol>
                <IonCol size='12' style={{background:"#EDEDED", borderRadius:"10px", padding:"5px 10px", margin:"5px 0"}}>
                  <IonInput mode='ios' inputMode='numeric' placeholder='No HP Customer' name='phone_customer' id='phone_customer' />
                </IonCol>
                <IonCol size='12' style={{background:"#EDEDED", borderRadius:"10px", padding:"5px 10px", margin:"5px 0"}}>
                  <IonInput mode='ios' inputMode='email' placeholder='Email Customer' name='email_customer' id='email_customer' />
                </IonCol>
                <IonCol size='12' style={{background:"#EDEDED", borderRadius:"10px", padding:"5px 10px", margin:"5px 0"}}>
                  <IonInput mode='ios' inputMode='text' placeholder='Nama Perusahaan' name='perusahaan' id='perusahaan' />
                </IonCol>
                <IonCol size='12' style={{background:"#EDEDED", borderRadius:"10px", padding:"5px 10px", margin:"5px 0"}}>
                  <IonTextarea placeholder='Keterangan' name='keterangan' id='keterangan' ></IonTextarea>
                </IonCol>

                {(add64Foto === '')?
                <IonCol size='12' style={{padding:0, textAlign:"center"}}>
                  <input type='file' name='fileFoto' id='fileFoto' style={{display:"none"}} onChange={()=>{onSelectFile('Foto')}}/>
                  <IonButton mode='ios' color='medium' fill='outline' onClick={()=>{selectFile('Foto')}} size='large' expand="block">
                      <IonRippleEffect></IonRippleEffect>
                      <IonIcon icon={addCircleOutline} slot='start' style={{margin:"0 5px", padding:0}} />
                      Pilih file
                  </IonButton>
                </IonCol>:
                <IonCol size='12' style={{margin:"10px 0 0 0", padding:0}}>
                  <IonRow style={{padding:0, margin:0, width:"100%"}}>
                    <IonCol size='12' style={{textAlign:"center", border:"solid 1px #DEDEDE", borderRadius:"10px", margin:"0 0 5px 0"}}>
                      <IonText mode='ios' style={{fontSize:"12px"}}>Preview</IonText>
                      {(add64FotoType.includes('pdf'))?
                        <IonButton mode='ios' expand='block' fill='clear' disabled={true} size='large'>
                          <IonIcon icon={documentTextOutline} style={{fontSize:"42px"}}/>
                        </IonButton>
                      :
                      <IonImg src={`${add64Foto}`} style={{width:"100%", height:"159px", margin:"0 auto"}} />
                      }
                    </IonCol>
                    <IonCol size='10' style={{textAlign:"start", padding:"7px 10px 5px 10px", background:"#DEDEDE", borderRadius:"10px 0 0 10px"}}>
                      <IonInput mode='ios' inputMode='text' value={add64FotoNama} readonly={true} disabled={true} />
                    </IonCol>
                    <IonCol size='2' style={{textAlign:"end", padding:0, background:"#DEDEDE", borderRadius:"0 10px 10px 0"}} onClick={()=>{onDeleteFile('Foto')}}>
                      <IonButton mode='ios' fill='clear' color='danger'>
                        <IonIcon icon={closeCircleOutline} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonCol>
                }
              </IonRow>
            </IonGrid>
          </IonContent>
          <IonFooter mode='ios' style={{background:"var(--ion-color-step-100)"}}>
            <IonGrid>
              <IonRow>
                <IonCol size='12'>
                  <IonButton mode='ios' expand='block' color='primary' onClick={()=>{doTambahCust()}}>
                    <IonRippleEffect></IonRippleEffect>
                    Simpan
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonFooter>
        </IonModal>


        <IonModal mode='ios' isOpen={isModalTambahAktivitas} onDidDismiss={()=>{setIsModalTambahAktivitas(false)}} animated={true} enterAnimation={inAnimation} leaveAnimation={outAnimation}>
          <IonHeader mode='ios'>
            <IonToolbar mode='ios'>
              <IonButtons slot='start'>
                <IonButton mode='ios' color='primary' onClick={()=>{setIsModalTambahAktivitas(false)}}>
                  <IonIcon icon={chevronBackOutline} slot='start' style={{margin:0, padding:0}} />
                  BACK
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonGrid style={{padding:"10% 5%"}}>
              <IonRow>
                <IonCol size='12' style={{textAlign:"center", margin:"0 0 10px 0"}}>
                  <IonText mode='ios' style={{color:"var(--ion-color-dark-tint)", display:"flex", flexDirection:'column'}}>
                    <span style={{fontSize:"28px"}}>Tambah Aktivitas</span>
                    <span style={{fontSize:"12px", margin:"5px 0 0 0"}}>Masukkan Aktivitas</span>
                  </IonText>
                </IonCol>
                <IonCol size='12' style={{background:"#EDEDED", borderRadius:"10px", padding:"5px 10px", margin:"5px 0"}}>
                  <IonInput mode='ios' inputMode='text' placeholder='Message' name='message' id='message' />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonContent>
          <IonFooter mode='ios' style={{background:"var(--ion-color-step-100)"}}>
            <IonGrid>
              <IonRow>
                <IonCol size='12'>
                  <IonButton mode='ios' expand='block' color='primary' onClick={()=>{doTambahAktivitas()}}>
                    <IonRippleEffect></IonRippleEffect>
                    Simpan
                  </IonButton>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonFooter>
        </IonModal>

        <IonModal mode='ios' isOpen={isModalLogAktivitas} onDidDismiss={()=>{setIsModalLogAktivitas(false)}} animated={true} enterAnimation={inAnimation} leaveAnimation={outAnimation}>
          <IonHeader mode='ios'>
            <IonToolbar mode='ios'>
              <IonButtons slot='start'>
                <IonButton mode='ios' color='primary' onClick={()=>{setIsModalLogAktivitas(false)}}>
                  <IonIcon icon={chevronBackOutline} slot='start' style={{margin:0, padding:0}} />
                  BACK
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
              <IonRefresher slot="fixed" onIonRefresh={refreshDataLog}>
                <IonRefresherContent></IonRefresherContent>
              </IonRefresher>
            <IonGrid>
              {dataLogAktivitas.map((a, index)=>{
                  return(
                      <IonCard key={index} style={{borderRadius:"10px", margin:"5px", border:"1px solid rgba(31, 134, 255, 0.5)"}}>
                        <IonCardContent>
                          <IonRow>
                            <IonCol size='12' style={{fontSize:"12px", marginBottom:"0", paddingBottom:"0", textAlign:"start"}}>
                              <IonText mode='ios' style={{fontSize:"12px", textAlign:"start"}}>
                                {a['created_at']}
                              </IonText>
                            </IonCol>
                            <IonCol size='12' style={{marginTop:0, paddingTop:"0",  marginBottom:"0", paddingBottom:"0"}}>
                                <IonText mode='ios' style={{fontSize:"12px"}}>
                                <span style={{fontSize:"12px"}}><IonIcon icon={bookmarkSharp} style={{color:"#3171e0", fontSize:"12px"}}></IonIcon> {a['message']}</span>
                                </IonText>
                            </IonCol>
                          </IonRow>
                        </IonCardContent>
                      </IonCard>
                  )
              })}
          </IonGrid>
          </IonContent>
        </IonModal>

        <IonModal mode='ios' isOpen={isModalPassword} initialBreakpoint={0.65} breakpoints={[0, 0.65]} onDidDismiss={()=>{setIsModalPassword(false)}} animated={true} >
          <IonHeader mode='ios'>
            <IonToolbar mode='ios'>
              <IonButtons slot='start'>
                <IonButton mode='ios' color='primary' onClick={()=>{setIsModalPassword(false)}}>
                  <IonIcon icon={chevronBackOutline} slot='start' style={{margin:0, padding:0}} />
                  BACK
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
            <IonGrid>
              <IonRow>
                <IonText mode='ios'>Nama Customer</IonText>
                <IonCol size='12' style={{background:"#EDEDED", borderRadius:"10px", padding:"5px 10px", margin:"5px 0"}}>
                    <IonInput mode='ios' readonly={true} name='name' id='name' value={isSelectNama}/>
                </IonCol>
                <IonText mode='ios'>Email Customer</IonText>
                <IonCol size='12' style={{background:"#EDEDED", borderRadius:"10px", padding:"5px 10px", margin:"5px 0"}}>
                    <IonInput mode='ios' inputMode='email' name='email' id='email' value={isSelectEmail}/>
                </IonCol>
                <IonText mode='ios'>Phone Customer</IonText>
                <IonCol size='12' style={{background:"#EDEDED", borderRadius:"10px", padding:"5px 10px", margin:"5px 0"}}>
                    <IonInput mode='ios' inputMode='numeric' name='phone' id='phone' value={isSelectPhone}/>
                </IonCol>
                <IonText mode='ios'>Password Customer</IonText>
                <IonCol size='12' style={{background:"#EDEDED", borderRadius:"10px", padding:"5px 10px", margin:"5px 0"}}>
                    <IonInput mode='ios' type="password" placeholder='Password' name='password' id='password'/>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonButton  mode='ios' expand='block' color='primary' onClick={()=>{doCustomer()}}>Simpan</IonButton>
              </IonRow>
          </IonGrid>
          </IonContent>
        </IonModal>


      
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton color='primary' mode='ios'>
            <IonIcon icon={add} onClick={()=>{setIsModalTambahCalonCustomer(true)}}/>
          </IonFabButton>
        </IonFab>
      </IonContent>

      <IonLoading 
          mode='ios'
          isOpen={isLoading}
          spinner='circular'
        />

      <IonActionSheet 
        mode='ios'
        cssClass='my-custom-class'
        isOpen={isActionDetail}
        onDidDismiss={()=>{setIsActionDetail(false)}}
        buttons={buttonSheet()}
      />

      <IonActionSheet 
        mode='ios'
        cssClass='my-custom-class'
        isOpen={isActionDetail2}
        onDidDismiss={()=>{setIsActionDetail2(false)}}
        buttons={buttonSheet2()}
      />

      <IonToast 
        mode='ios'
        isOpen={isToast}
        message={isToastMessage}
        onDidDismiss={()=>{setIsToast(false)}}
        color={isToastColor}
        duration={isToastDuration}
        icon={(isToastColor === 'danger')?closeCircleOutline:checkmarkCircleOutline}
        position='top'
    />
    </IonPage>
  );
};

export default Beranda;
function set64FotoType(arg0: string) {
  throw new Error('Function not implemented.');
}

