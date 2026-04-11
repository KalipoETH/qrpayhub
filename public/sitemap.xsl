<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html lang="en">
      <head>
        <title>XML Sitemap – QRPayHub</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #F8FAFC;
            color: #1E293B;
            min-height: 100vh;
            padding: 2rem 1rem;
          }

          .wrapper {
            max-width: 1200px;
            margin: 0 auto;
          }

          /* ── Header card ── */
          .header {
            background: #fff;
            border: 1px solid #E2E8F0;
            border-radius: 1rem;
            padding: 1.75rem 2rem;
            margin-bottom: 1.25rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 1rem;
            box-shadow: 0 1px 3px rgba(0,0,0,.06);
          }

          .header-left h1 {
            font-size: 1.5rem;
            font-weight: 700;
            color: #0F172A;
          }

          .header-left p {
            font-size: 0.875rem;
            color: #64748B;
            margin-top: 0.25rem;
          }

          .header-badge {
            background: #EFF6FF;
            color: #1D4ED8;
            border: 1px solid #BFDBFE;
            border-radius: 9999px;
            padding: 0.35rem 1rem;
            font-size: 0.8rem;
            font-weight: 600;
            white-space: nowrap;
          }

          /* ── Stats bar ── */
          .stats {
            display: flex;
            flex-wrap: wrap;
            gap: 0.75rem;
            margin-bottom: 1.25rem;
          }

          .stat-card {
            background: #fff;
            border: 1px solid #E2E8F0;
            border-radius: 0.75rem;
            padding: 0.75rem 1.25rem;
            font-size: 0.875rem;
            color: #475569;
            box-shadow: 0 1px 2px rgba(0,0,0,.04);
          }

          .stat-card strong {
            color: #0F172A;
            font-weight: 700;
          }

          /* ── Table wrapper ── */
          .table-wrap {
            background: #fff;
            border: 1px solid #E2E8F0;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0,0,0,.06);
            overflow-x: auto;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.8125rem;
          }

          thead tr {
            background: #1E40AF;
          }

          thead th {
            padding: 0.875rem 1rem;
            text-align: left;
            font-weight: 600;
            color: #fff;
            letter-spacing: 0.03em;
            white-space: nowrap;
          }

          tbody tr:nth-child(even) { background: #F1F5F9; }
          tbody tr:nth-child(odd)  { background: #fff; }
          tbody tr:hover { background: #EFF6FF; transition: background 0.15s; }

          td {
            padding: 0.625rem 1rem;
            vertical-align: middle;
            border-bottom: 1px solid #E2E8F0;
          }

          td a {
            color: #1D4ED8;
            text-decoration: none;
            word-break: break-all;
          }
          td a:hover { text-decoration: underline; }

          /* ── Priority badges ── */
          .badge {
            display: inline-block;
            padding: 0.2rem 0.6rem;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.02em;
          }

          .badge-10  { background: #DCFCE7; color: #166534; }
          .badge-09  { background: #D1FAE5; color: #065F46; }
          .badge-08  { background: #DBEAFE; color: #1E40AF; }
          .badge-07  { background: #F1F5F9; color: #475569; border: 1px solid #CBD5E1; }
          .badge-low { background: #F8FAFC; color: #94A3B8; border: 1px solid #E2E8F0; }

          /* ── Frequency pill ── */
          .freq {
            display: inline-block;
            padding: 0.15rem 0.5rem;
            border-radius: 0.375rem;
            font-size: 0.7rem;
            font-weight: 600;
            background: #F1F5F9;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 0.06em;
          }

          /* ── Footer ── */
          .footer {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 0.8rem;
            color: #94A3B8;
          }

          .footer a { color: #64748B; text-decoration: none; }
          .footer a:hover { text-decoration: underline; }

          @media (max-width: 640px) {
            body { padding: 1rem 0.5rem; }
            .header { padding: 1.25rem; }
            .header-left h1 { font-size: 1.2rem; }
          }
        </style>
      </head>
      <body>
        <div class="wrapper">

          <!-- ── Header ─────────────────────────────────────────── -->
          <div class="header">
            <div class="header-left">
              <h1>🌐 QRPayHub Sitemap</h1>
              <p>XML Sitemap – qrpayhub.com</p>
            </div>
            <span class="header-badge">sitemap.xml</span>
          </div>

          <!-- ── Stats ──────────────────────────────────────────── -->
          <div class="stats">
            <div class="stat-card">
              Total URLs: <strong>
                <xsl:value-of select="count(sitemap:urlset/sitemap:url)"/>
              </strong>
            </div>
            <div class="stat-card">
              Last generated: <strong><xsl:value-of select="substring(sitemap:urlset/sitemap:url[1]/sitemap:lastmod,1,10)"/></strong>
            </div>
            <div class="stat-card">
              Namespace: <strong>sitemaps.org/0.9</strong>
            </div>
          </div>

          <!-- ── Table ──────────────────────────────────────────── -->
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>URL</th>
                  <th>Last Modified</th>
                  <th>Change Frequency</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <xsl:for-each select="sitemap:urlset/sitemap:url">
                  <xsl:sort select="sitemap:priority" order="descending" data-type="number"/>
                  <tr>
                    <td style="color:#94A3B8;font-variant-numeric:tabular-nums;width:3rem;">
                      <xsl:value-of select="position()"/>
                    </td>
                    <td>
                      <a href="{sitemap:loc}" target="_blank" rel="noopener noreferrer">
                        <xsl:value-of select="sitemap:loc"/>
                      </a>
                    </td>
                    <td style="white-space:nowrap;color:#64748B;">
                      <xsl:value-of select="substring(sitemap:lastmod,1,10)"/>
                    </td>
                    <td>
                      <span class="freq">
                        <xsl:value-of select="sitemap:changefreq"/>
                      </span>
                    </td>
                    <td>
                      <xsl:choose>
                        <xsl:when test="sitemap:priority = '1.0'">
                          <span class="badge badge-10"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority = '0.9'">
                          <span class="badge badge-09"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority = '0.8'">
                          <span class="badge badge-08"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:when test="sitemap:priority = '0.7'">
                          <span class="badge badge-07"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:when>
                        <xsl:otherwise>
                          <span class="badge badge-low"><xsl:value-of select="sitemap:priority"/></span>
                        </xsl:otherwise>
                      </xsl:choose>
                    </td>
                  </tr>
                </xsl:for-each>
              </tbody>
            </table>
          </div>

          <!-- ── Footer ─────────────────────────────────────────── -->
          <div class="footer">
            Generated by <a href="https://www.qrpayhub.com" target="_blank" rel="noopener noreferrer">qrpayhub.com</a>
          </div>

        </div>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
