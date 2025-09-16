import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = "https://tuogdyemsfdmhxrvmrlq.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1b2dkeWVtc2ZkbWh4cnZtcmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ5OTAsImV4cCI6MjA3MzYwMDk5MH0.yHeM8tkZuzA8PuooVIOrDtdgCTS3jfuXLzQ55-235NU"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

// login
const loginForm = document.getElementById('login-form')
const adminPanel = document.getElementById('admin-panel')

loginForm.addEventListener('submit', async e => {
  e.preventDefault()
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if(error){
    alert("Login fejlede: " + error.message)
  } else {
    loginForm.style.display = 'none'
    adminPanel.style.display = 'block'
    loadProjects()
    loadSiteData()
  }
})

// load projects
async function loadProjects() {
  const { data: projects } = await supabase.from('projects').select('*')
  document.getElementById('project-list').innerHTML = (projects || []).map(p=>`
    <div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
    </div>
  `).join('')
}

// tilføj projekt
const projectForm = document.getElementById('project-form')
projectForm.addEventListener('submit', async e => {
  e.preventDefault()
  const title = document.getElementById('title').value
  const description = document.getElementById('description').value
  const image_url = document.getElementById('image_url').value

  const { error } = await supabase.from('projects').insert([{ title, description, image_url }])
  if(error) alert("Fejl: " + error.message)
  else { alert("Projekt tilføjet!"); loadProjects() }
})

// hent og rediger site-data (about, footer, contact)
async function loadSiteData(){
  const { data: siteData } = await supabase.from('site_content').select('*').single()
  if(siteData){
    document.getElementById('input-siteTitle').value = siteData.siteTitle || ''
    document.getElementById('input-about').value = siteData.about || ''
    document.getElementById('input-footerLeft').value = siteData.footerLeft || ''
    document.getElementById('input-mail').value = siteData.contactMail || ''
    document.getElementById('input-phone').value = siteData.contactPhone || ''
    document.getElementById('input-address').value = siteData.contactAddress || ''
    document.getElementById('input-linkedin').value = siteData.contactLinkedin || ''
    document.getElementById('input-instagram').value = siteData.contactInstagram || ''
  }
}

// save site data
document.getElementById('save-site').addEventListener('click', async ()=>{
  const obj = {
    siteTitle: document.getElementById('input-siteTitle').value,
    about: document.getElementById('input-about').value,
    footerLeft: document.getElementById('input-footerLeft').value,
    contactMail: document.getElementById('input-mail').value,
    contactPhone: document.getElementById('input-phone').value,
    contactAddress: document.getElementById('input-address').value,
    contactLinkedin: document.getElementById('input-linkedin').value,
    contactInstagram: document.getElementById('input-instagram').value
  }
  const { error } = await supabase.from('site_content').upsert([obj])
  if(error) alert("Fejl: " + error.message)
  else alert("Site data gemt!")
})
