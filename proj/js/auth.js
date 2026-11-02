document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);
  function setError(input, message) {
    input.classList.toggle("invalid", Boolean(message));
    const target = input.closest(".field")?.querySelector(".error");
    if (target) target.textContent = message || "";
  }
  function showMessage(id, message, success=false) {
    const target = $(id);
    if (target) { target.textContent = message; target.className = `inline-message${success?" success":""}`; }
  }
  function users() {
    try { return JSON.parse(localStorage.getItem("aureliaUsers") || "[]"); } catch (_) { return []; }
  }
  function saveUsers(data) { localStorage.setItem("aureliaUsers", JSON.stringify(data)); }
  document.querySelectorAll("input").forEach(input => input.addEventListener("input", () => setError(input,"")));

  const register = $("registerForm");
  if (register) register.addEventListener("submit", event => {
    event.preventDefault();
    const name=$("name"), email=$("regEmail"), mobile=$("regMobile"), username=$("username"), password=$("password"), confirm=$("confirmPassword");
    let valid = true;
    [[name, name.value.trim().length>=2 ? "" : "Enter your full name."],
     [email,/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "" : "Enter a valid email address."],
     [mobile,/^\d{10}$/.test(mobile.value.trim()) ? "" : "Enter a 10-digit mobile number."],
     [username,username.value.trim().length>=3 ? "" : "Username must have at least 3 characters."],
     [password,password.value.length>=6 ? "" : "Password must have at least 6 characters."],
     [confirm,confirm.value===password.value && confirm.value ? "" : "Passwords must match."]
    ].forEach(([el,msg])=>{setError(el,msg);if(msg)valid=false;});
    if (!valid) { register.querySelector(".invalid")?.focus(); return; }
    const list=users();
    if (list.some(u=>u.email.toLowerCase()===email.value.trim().toLowerCase()||u.username.toLowerCase()===username.value.trim().toLowerCase())) {
      setError(email, list.some(u=>u.email.toLowerCase()===email.value.trim().toLowerCase()) ? "This email is already registered." : "");
      setError(username, list.some(u=>u.username.toLowerCase()===username.value.trim().toLowerCase()) ? "This username is already taken." : "");
      return;
    }
    list.push({name:name.value.trim(),email:email.value.trim(),mobile:mobile.value.trim(),username:username.value.trim(),password:password.value});
    saveUsers(list);
    localStorage.setItem("aureliaCurrentUser",JSON.stringify({name:name.value.trim(),email:email.value.trim(),username:username.value.trim()}));
    window.location.href="index.html";
  });

  const login=$("loginForm");
  if(login) login.addEventListener("submit",event=>{
    event.preventDefault();
    const id=$("loginId"), password=$("loginPassword");
    let valid=true;
    [[id,id.value.trim()?"":"Enter your username or email."],[password,password.value?"":"Enter your password."]].forEach(([el,msg])=>{setError(el,msg);if(msg)valid=false;});
    if(!valid)return;
    const user=users().find(u=>(u.username.toLowerCase()===id.value.trim().toLowerCase()||u.email.toLowerCase()===id.value.trim().toLowerCase())&&u.password===password.value);
    if(!user){showMessage("loginMessage","We couldn't match those details. Check them or create a demo account.");return;}
    localStorage.setItem("aureliaCurrentUser",JSON.stringify({name:user.name,email:user.email,username:user.username}));
    window.location.href="index.html";
  });

  const forgot=$("forgotForm");
  if(forgot) forgot.addEventListener("submit",event=>{
    event.preventDefault();
    const email=$("forgotEmail");
    const good=/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
    setError(email,good?"":"Enter a valid email address.");
    if(good) showMessage("forgotMessage","If this email belongs to a demo account, reset instructions would be sent. This project does not send real emails.",true);
  });
});