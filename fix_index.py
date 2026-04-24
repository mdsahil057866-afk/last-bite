import re

with open(r'c:\Users\LC\Desktop\last bite1\index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and replace the HOW IT WORKS section
start_marker = '<!-- HOW IT WORKS -->'
end_marker = '</section>\n\n<!-- AI CONDITIONS'

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1:
    print('Start marker not found')
elif end_idx == -1:
    print('End marker not found')
else:
    new_section = '''<!-- HOW IT WORKS - 7-Step AI Flow -->
<section id="how" style="padding:100px 0;">
  <div class="container">
    <div class="text-center mb-24">
      <div class="badge badge-blue mb-16">7-Step AI Flow</div>
      <h2 class="section-title">How <span class="title-green">LAST BITE</span> Works</h2>
      <p class="section-sub">From surplus food to zero waste - fully AI-automated</p>
    </div>
    <div style="display:flex;flex-direction:column;gap:14px;max-width:780px;margin:0 auto;">
      <div class="card animate-slide-up" style="display:flex;gap:16px;align-items:flex-start;border-color:rgba(249,115,22,0.25);">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(249,115,22,0.15);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">1</div>
        <div><div style="font-weight:700;margin-bottom:4px;">Food Upload</div><div style="font-size:13px;color:#94a3b8;">Restaurant / event organizer uploads food type, quantity and expiry time. AI instantly receives the data.</div></div>
      </div>
      <div class="card animate-slide-up delay-1" style="display:flex;gap:16px;align-items:flex-start;border-color:rgba(59,130,246,0.25);">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(59,130,246,0.15);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">2</div>
        <div><div style="font-weight:700;margin-bottom:4px;">Smart Notification (2-3 KM Radius)</div><div style="font-size:13px;color:#94a3b8;">AI sends instant alert to nearby users within 2-3 km: Flash Food Alert - Fresh event food near you!</div></div>
      </div>
      <div class="card animate-slide-up delay-2" style="display:flex;gap:16px;align-items:flex-start;border-color:rgba(34,197,94,0.25);">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.15);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">3</div>
        <div><div style="font-weight:700;margin-bottom:4px;">AI User Matching</div><div style="font-size:13px;color:#94a3b8;">AI ranks users by past orders, preferences and distance. Highest match score = first notification. Real AI, not just a name.</div></div>
      </div>
      <div class="card animate-slide-up delay-3" style="display:flex;gap:16px;align-items:flex-start;border-color:rgba(249,115,22,0.25);">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(249,115,22,0.15);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">4</div>
        <div><div style="font-weight:700;margin-bottom:4px;">Order Placement</div><div style="font-size:13px;color:#94a3b8;">Customer opens app, selects food at Flash Sale price, and places order with one tap.</div></div>
      </div>
      <div class="card animate-slide-up" style="display:flex;gap:16px;align-items:flex-start;border-color:rgba(59,130,246,0.25);">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(59,130,246,0.15);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">5</div>
        <div><div style="font-weight:700;margin-bottom:4px;">Auto Assignment (AI Tracking)</div><div style="font-size:13px;color:#94a3b8;">AI detects customer location and assigns nearest delivery partner automatically - or customer can pick up directly.</div></div>
      </div>
      <div class="card animate-slide-up" style="display:flex;gap:16px;align-items:flex-start;border-color:rgba(34,197,94,0.25);">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.15);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">6</div>
        <div><div style="font-weight:700;margin-bottom:4px;">OTP Verification</div><div style="font-size:13px;color:#94a3b8;">Customer enters OTP at delivery. No fake orders. Secure delivery. Both parties protected.</div></div>
      </div>
      <div class="card animate-slide-up" style="display:flex;gap:16px;align-items:flex-start;border-color:rgba(34,197,94,0.4);background:linear-gradient(135deg,rgba(34,197,94,0.06),transparent);">
        <div style="width:44px;height:44px;border-radius:12px;background:rgba(34,197,94,0.2);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">7</div>
        <div><div style="font-weight:700;margin-bottom:4px;color:#22c55e;">NGO Donation (If Unsold)</div><div style="font-size:13px;color:#94a3b8;">If food does not sell, AI auto-alerts NGOs for free pickup. Zero waste - guaranteed.</div></div>
      </div>
    </div>
    <div style="text-align:center;margin-top:36px;">
      <div style="display:inline-block;padding:18px 32px;background:linear-gradient(135deg,rgba(34,197,94,0.1),rgba(249,115,22,0.08));border:1px solid rgba(255,255,255,0.1);border-radius:16px;">
        <div style="font-size:18px;margin-bottom:6px;">Idea</div>
        <div style="font-family:\'Poppins\',sans-serif;font-weight:700;font-size:1rem;">AI decides: Sell if there is demand, Donate if there is need.</div>
        <div style="font-size:12px;color:#94a3b8;margin-top:8px;">Zero food waste - Smart city - Real-time AI decisions</div>
      </div>
    </div>
  </div>
</section>

'''
    content = content[:start_idx] + new_section + content[end_idx + len('</section>\n\n'):]
    with open(r'c:\Users\LC\Desktop\last bite1\index.html', 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS - replaced section, total chars:', len(content))
