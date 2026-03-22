import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";  
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";  

// 🔧 Configuración Firebase
const firebaseConfig = {  
  apiKey: "AIzaSyDuF8oL5UWaIXw_vt_HdAsiKC4I3irj8rM",
    authDomain: "bcpf-ba4cd.firebaseapp.com",
    databaseURL: "https://bcpf-ba4cd-default-rtdb.firebaseio.com",
    projectId: "bcpf-ba4cd",
    storageBucket: "bcpf-ba4cd.firebasestorage.app",
    messagingSenderId: "1073055247962",
    appId: "1:1073055247962:web:88f888730ee3577dcb7263",
    measurementId: "G-TCFHF3FMKQ"
  };
const app = initializeApp(firebaseConfig);  
const db = getDatabase(app);  

// 🔑 Verificar token
window.checkToken = function(){  
  const token = document.getElementById("token").value.trim();  
  if(!token){ alert("Introduce un token"); return; }  

  const tokenRef = ref(db, 'tokens/' + token);  
  get(tokenRef).then(snapshot=>{  
    if(snapshot.exists()){  
      const data = snapshot.val();  
      if(data.used){  
        alert("Este token ya fue usado");  
      } else {  
        update(tokenRef,{used:true}).then(()=>{  
          localStorage.setItem("tokenUsed", token);  
          alert(`¡Bienvenido ${data.userName}! Redirigiendo...`);  
          window.location.href="registro";  
        });  
      }  
    } else {  
      alert("Token inválido");  
    }  
  }).catch(err=>alert("Error al verificar token: "+err));  
}  

// 🚪 Redirigir si ya está logueado
window.onload=function(){  
  if(localStorage.getItem("tokenUsed")){  
    window.location.href="login";  
  }  
    }
