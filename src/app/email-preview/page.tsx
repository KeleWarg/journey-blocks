'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'

export default function EmailPreviewPage() {
  const [view, setView] = React.useState<'desktop' | 'mobile'>('desktop')
  const [htmlContent, setHtmlContent] = React.useState<string>('')
  const [showEditor, setShowEditor] = React.useState(false)
  const [editedHtml, setEditedHtml] = React.useState<string>('')

  useEffect(() => {
    // Fetch the HTML template
    fetch('/email-preview/template')
      .then(res => res.text())
      .then(html => {
        setHtmlContent(html)
        setEditedHtml(html)
      })
  }, [])

  const handleHtmlChange = (newHtml: string) => {
    setEditedHtml(newHtml)
  }

  return (
    <div className="min-h-screen bg-neutral-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Email Preview</h1>
            <p className="text-neutral-500">Pet Insurance Quotes - Iterable Template</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setView('desktop')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                view === 'desktop' 
                  ? 'bg-primary-700 text-white' 
                  : 'bg-white text-neutral-800 border border-neutral-200'
              }`}
            >
              Desktop (600px)
            </button>
            <button
              onClick={() => setView('mobile')}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                view === 'mobile' 
                  ? 'bg-primary-700 text-white' 
                  : 'bg-white text-neutral-800 border border-neutral-200'
              }`}
            >
              Mobile (360px)
            </button>
            <button
              onClick={() => setShowEditor(!showEditor)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                showEditor 
                  ? 'bg-primary-700 text-white' 
                  : 'bg-white text-neutral-800 border border-neutral-200'
              }`}
            >
              {showEditor ? 'Hide' : 'Show'} Editor
            </button>
          </div>
        </div>

        <div className="flex gap-4">
          {/* Editor Panel */}
          {showEditor && (
            <div className="w-1/2 bg-white rounded-xl shadow-lg p-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">HTML Editor</h2>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(editedHtml)
                    alert('HTML copied to clipboard!')
                  }}
                  className="px-3 py-1 text-sm bg-primary-700 text-white rounded"
                >
                  Copy HTML
                </button>
              </div>
              <textarea
                value={editedHtml}
                onChange={(e) => handleHtmlChange(e.target.value)}
                className="w-full h-[600px] p-4 font-mono text-sm border border-neutral-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-700"
                spellCheck={false}
              />
            </div>
          )}

          {/* Preview Panel */}
          <div className={`flex justify-center items-start ${showEditor ? 'w-1/2' : 'w-full'}`}>
            <div 
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300"
              style={{ 
                width: view === 'desktop' ? 600 : 360,
                minWidth: view === 'desktop' ? 600 : 360,
                maxWidth: view === 'desktop' ? 600 : 360,
                overflowX: 'hidden',
                margin: '0 auto'
              }}
            >
              {/* Embed HTML directly instead of iframe for better interaction */}
              <div 
                dangerouslySetInnerHTML={{ __html: editedHtml }}
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  overflowX: 'hidden'
                }}
                className={`email-preview ${view === 'mobile' ? 'mobile-view' : ''}`}
                suppressHydrationWarning
              />
              <style jsx global>{`
                .email-preview {
                  overflow-x: hidden !important;
                }
                .email-preview table[style*="border-radius"] {
                  border-radius: 8px !important;
                  -webkit-border-radius: 8px !important;
                  -moz-border-radius: 8px !important;
                }
                /* Force mobile styles when mobile-view class is present */
                .mobile-view {
                  overflow-x: hidden !important;
                  max-width: 100% !important;
                }
                .mobile-view table.email-container,
                .mobile-view table[width="600"] {
                  width: 100% !important;
                  max-width: 360px !important;
                  min-width: 0 !important;
                  margin: 0 auto !important;
                  display: table !important;
                }
                .mobile-view table {
                  margin-left: auto !important;
                  margin-right: auto !important;
                }
                .mobile-view td.content-padding {
                  padding-left: 16px !important;
                  padding-right: 16px !important;
                }
                .mobile-view td.content-padding[style*="padding: 0 24px"] {
                  padding: 0 16px !important;
                }
                .mobile-view td.content-padding[style*="padding: 20px 24px"] {
                  padding: 20px 16px !important;
                }
                .mobile-view td.content-padding[style*="padding: 0 24px 40px"] {
                  padding: 0 16px 40px !important;
                }
                .mobile-view td[style*="padding: 12px 24px"] {
                  padding: 12px 16px !important;
                }
                .mobile-view td[style*="padding: 20px 24px"] {
                  padding: 20px 16px !important;
                }
                .mobile-view td[style*="padding: 32px 24px"] {
                  padding: 32px 16px !important;
                }
                .mobile-view table[width="552"] {
                  width: 100% !important;
                  max-width: 100% !important;
                }
                .mobile-view img {
                  max-width: 100% !important;
                  height: auto !important;
                }
                .mobile-view img[src*="forbes-advisor-logo"] {
                  max-width: 120px !important;
                  width: 120px !important;
                }
                .mobile-view img[src*="forbes-logo"] {
                  max-width: 60px !important;
                  width: 60px !important;
                }
                .mobile-view td[width] {
                  width: auto !important;
                  max-width: 100% !important;
                }
                .mobile-view .plan-left,
                .mobile-view .plan-right {
                  width: 100% !important;
                  display: block !important;
                }
                .mobile-view td.plan-left {
                  border-right: none !important;
                  border: none !important;
                }
                .mobile-view td.plan-right {
                  padding-left: 0 !important;
                  padding-right: 0 !important;
                }
                .mobile-view .plan-stat {
                  padding-right: 8px !important;
                }
                .mobile-view .plan-stat:first-child {
                  padding-left: 0 !important;
                  padding-right: 12px !important;
                }
                .mobile-view .plan-stat:nth-child(2) {
                  padding-left: 8px !important;
                  padding-right: 12px !important;
                }
                .mobile-view .plan-stat:last-child {
                  padding-right: 0 !important;
                  padding-left: 8px !important;
                }
                .mobile-view .divider-vertical {
                  display: none !important;
                }
                .mobile-view .headline,
                .mobile-view h1.headline {
                  font-size: 28px !important;
                  line-height: 36px !important;
                }
                .mobile-view td[style*="padding: 12px 16px"] {
                  padding: 12px 16px !important;
                  margin-bottom: 8px !important;
                }
                .mobile-view td[width="44"] {
                  padding-right: 12px !important;
                }
                .mobile-view td[width="44"] + td {
                  padding-left: 0 !important;
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
