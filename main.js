import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = "https://tuogdyemsfdmhxrvmrlq.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1b2dkeWVtc2ZkbWh4cnZtcmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ5OTAsImV4cCI6MjA3MzYwMDk5MH0.yHeM8tkZuzA8PuooVIOrDtdgCTS3jfuXLzQ55-235NU"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function loadSiteData() {
  // hent site info (about, footer, contact)
  const { data: siteData, error: siteError } = await supabase
    .from('site_content')
    .select('*')
    .single()
  
  if(siteError){
    console.error(siteError)
  }

  // hent projekter
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if(projectsError){
    console.error(projectsError)
  }

  return { siteData, projects }
}

async function render(){
  const { siteData, projects } = await loadSiteData()

  // site title
  document.getElementById('site-title').textContent = siteData?.siteTitle || "Phillip Geo / BareetDesign"

  // footer
  document.getElementById('footer-left').innerText = siteData?.footerLeft || "Phillip Geo\nCopyright © 2024"
  document.getElementById('footer-mail').href = 'mailto:' + (siteData?.contactMail || 'example@mail.com')
  document.getElementById('footer-phone').href = 'tel:' + (siteData?.contactPhone || '+45 12 34 56 78')
  document.getElementById('footer-linkedin').href = siteData?.contactLinkedin || '#'
  document.getElementById('footer-instagram').href = siteData?.contactInstagram || '#'

  // projects grid
  const grid = document.getElementById('projects-grid')
  grid.innerHTML = ''
  (projects || []).forEach(p => {
    const a = document.createElement('a')
    a.href = p.link || '#'
    a.className = 'project'
    a.innerHTML = `<img src="${p.image_url}" alt="${p.title}"><h3>${p.title}</h3>`
    grid.appendChild(a)
  })
}

render()
