import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const SUPABASE_URL = "https://tuogdyemsfdmhxrvmrlq.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR1b2dkeWVtc2ZkbWh4cnZtcmxxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwMjQ5OTAsImV4cCI6MjA3MzYwMDk5MH0.yHeM8tkZuzA8PuooVIOrDtdgCTS3jfuXLzQ55-235NU"

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

async function loadProjects() {
  let { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error(error)
    return
  }

  const container = document.getElementById("projects")
  container.innerHTML = data.map(p => `
    <div class="project">
      <img src="${p.image_url}" alt="${p.title}">
      <h2>${p.title}</h2>
      <p>${p.description}</p>
    </div>
  `).join("")
}

loadProjects()
