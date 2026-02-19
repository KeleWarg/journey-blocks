import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: Request) {
  const templatePath = path.join(process.cwd(), 'email-templates', 'pet-insurance-quotes.html')
  
  try {
    let html = fs.readFileSync(templatePath, 'utf-8')
    
    // Replace relative paths with absolute URLs for preview
    const url = new URL(request.url)
    const origin = url.origin
    html = html.replace(/http:\/\/localhost:\d+\/fonts/g, `${origin}/fonts`)
    // Replace relative image paths with absolute URLs
    html = html.replace(/src="\/([^"]+)"/g, `src="${origin}/$1"`)
    
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    return new NextResponse('Template not found', { status: 404 })
  }
}
