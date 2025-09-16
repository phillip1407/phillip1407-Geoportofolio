import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = "https://tuogdyemsfdmhxrvmrlq.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1b2dkeWVtc2ZkbWh4cnZtcmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ5OTAsImV4cCI6MjA3MzYwMDk5MH0.yHeM8tkZuzA8PuooVIOrDtdgCTS3jfuXLzQ55-235NU"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const loginForm = document.getElementById("login-form")
const adminPanel = document.getElementById("admin-panel")

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) {
    alert("Login fejlede: " + error.message)
  } else {
    loginForm.style.display = "none"
    adminPanel.style.display = "block"
    loadProjects()
  }
})

const projectForm = document.getElementById("project-form")
projectForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const title = document.getElementById("title").value
  const description = document.getElementById("description").value
  const image_url = document.getElementById("image_url").value

  const { error } = await supabase.from("projects").insert([{ title, description, image_url }])
  if (error) {
    alert("Fejl: " + error.message)
  } else {
    alert("Projekt tilføjet!")
    loadProjects()
  }
})

async function loadProjects() {
  let { data } = await supabase.from("projects").select("*")
  document.getElementById("project-list").innerHTML = data.map(p => `
    <div>
      <h3>${p.title}</h3>
      <p>${p.description}</p>
    </div>
  `).join("")
}
