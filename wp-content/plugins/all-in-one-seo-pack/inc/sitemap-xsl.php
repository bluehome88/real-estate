<?php 
 
  
  
 /**
 * Sitemap XSL.
 *
 * Dynamically generates the XML Sitemap's XSL file.
 *
 * @package All_in_One_SEO_Pack
 * @since 2.3.6
 * @since 2.3.12.3 Refactoring indentation and added xmlns fix for Chrome rendering.
 */

echo '<?xml version="1.0" encoding="UTF-8"?>';
?>
<xsl:stylesheet version="2.0"
				xmlns="http://www.w3.org/1999/xhtml"
				xmlns:html="http://www.w3.org/TR/REC-html40"
				xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
				xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
				xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
				xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
	<xsl:template match="/">
		<xsl:variable name="fileType">
			<xsl:choose>
				<xsl:when test="//sitemap:url">Sitemap</xsl:when>
				<xsl:otherwise>SitemapIndex</xsl:otherwise>
			</xsl:choose>
		</xsl:variable>
		<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
				<title>
					<xsl:choose><xsl:when test="$fileType='Sitemap'">Sitemap</xsl:when>
						<xsl:otherwise>Sitemap Index</xsl:otherwise>
					</xsl:choose>
				</title>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
				<style type="text/css">
					body {
						margin: 0;
						font-family: Helvetica, Arial, sans-serif;
						font-size: 68.5%;
					}
					#content-head {
						background-color: #4275f4;
						padding: 20px 40px;
					}
					#content-head h1,
					#content-head p,
					#content-head a {
						color: #fff;
						font-size: 1.2em;
					}
					#content-head h1 {
						font-size: 2em;
					}
					table {
						margin: 20px 40px;
						border: none;
						border-collapse: collapse;
					}
					table {
						font-size: 1em;
						width: 75%;
					}
					th {
						border-bottom: 1px solid #ccc;
						text-align: left;
						padding: 15px 5px;
						font-size: 14px;
					}
					td {
						padding: 10px 5px;
						border-left: 3px solid #fff;
					}
					tr.stripe {
						background-color: #f7f7f7;
					}
					table td a {
						display: block;
					}
					table td a img {
						max-height: 30px;
						margin: 6px 3px;
					}
				</style>
			</head>
			<body>
				<div id="content">
					<div id="content-head">
						<h1>XML Sitemap</h1>
						<p><?php echo __( 'Generated by', 'all-in-one-seo-pack' ); ?> <a href="https://semperplugins.com/all-in-one-seo-pack-pro-version/?loc=aio_sitemap" target="_blank"><?php echo AIOSEOP_PLUGIN_NAME; ?></a>, <?php echo __( 'this is an XML Sitemap, meant to be consumed by search engines like Google or Bing.', 'all-in-one-seo-pack' ); ?><br/>
							<?php echo __( 'You can find more information about XML sitemaps at <a href="https://www.sitemaps.org/" target="_blank" rel="noreferrer noopener">sitemaps.org</a>', 'all-in-one-seo-pack' ); ?>.</p>
						<p><xsl:choose>
								<xsl:when test="$fileType='Sitemap'">
									<?php echo __( 'This sitemap contains', 'all-in-one-seo-pack' ); ?> <xsl:value-of select="count(sitemap:urlset/sitemap:url)"></xsl:value-of> <?php echo __( 'URLs', 'all-in-one-seo-pack' ); ?>.</xsl:when>
								<xsl:otherwise><?php echo __( 'This sitemap index contains', 'all-in-one-seo-pack' ); ?> <xsl:value-of select="count(sitemap:sitemapindex/sitemap:sitemap)"></xsl:value-of> <?php echo __( 'sitemaps', 'all-in-one-seo-pack' ); ?>.</xsl:otherwise>
							</xsl:choose></p>
					</div>
					<xsl:choose>
						<xsl:when test="$fileType='Sitemap'">
							<xsl:call-template name="sitemapTable"/></xsl:when>
						<xsl:otherwise><xsl:call-template name="siteindexTable"/></xsl:otherwise>
					</xsl:choose>
				</div>
			</body>
		</html>
	</xsl:template>
	<xsl:template name="siteindexTable">
		<table cellpadding="3">
			<thead>
			<tr>
				<th width="50%">URL</th>
				<th>Last Change</th>
			</tr>
			</thead>
			<tbody>
			<xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
			<xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
			<xsl:for-each select="sitemap:sitemapindex/sitemap:sitemap">
				<tr>
					<xsl:if test="position() mod 2 != 1">
						<xsl:attribute name="class">stripe</xsl:attribute>
					</xsl:if>
					<td>
						<xsl:variable name="itemURL">
							<xsl:value-of select="sitemap:loc"/>
						</xsl:variable>
						<a href="{$itemURL}">
							<xsl:value-of select="sitemap:loc"/>
						</a>
					</td>
					<td>
						<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
					</td>
				</tr>
			</xsl:for-each>
			</tbody>
		</table>
	</xsl:template>
	<xsl:template name="sitemapTable">
		<xsl:variable name="sitemapType">
			<xsl:for-each select="/*/namespace::*">
				<xsl:if test="name()='video'">
					<xsl:choose>
						<xsl:when test="name()='video'">video</xsl:when>
					</xsl:choose>
				</xsl:if>
			</xsl:for-each>
		</xsl:variable>

		<table cellpadding="3">
			<thead>
			<tr>
				<th width="50%">URL</th>
				<?php if ( aiosp_include_images() ) : ?>
					<th>Images</th>
				<?php endif; ?>
				<?php if ( AIOSEOPPRO ) : ?>
					<xsl:if test="$sitemapType='video'">
						<th>Videos</th>
						<th>Video Thumbnails</th>
					</xsl:if>
				<?php endif; ?>
				<th>Priority</th>
				<th>Change Frequency</th>
				<th>Last Change</th>
			</tr>
			</thead>
			<tbody>
			<xsl:variable name="lower" select="'abcdefghijklmnopqrstuvwxyz'"/>
			<xsl:variable name="upper" select="'ABCDEFGHIJKLMNOPQRSTUVWXYZ'"/>
			<xsl:for-each select="sitemap:urlset/sitemap:url">
				<tr>
					<xsl:if test="position() mod 2 != 1">
						<xsl:attribute name="class">stripe</xsl:attribute>
					</xsl:if>
					<td>
						<xsl:variable name="itemURL">
							<xsl:value-of select="sitemap:loc"/>
						</xsl:variable>
						<a href="{$itemURL}">
							<xsl:value-of select="sitemap:loc"/>
						</a>
					</td>
					<?php
					if ( aiosp_include_images() ) {
						?>
					<td>
					<xsl:value-of select="count(image:image)"/>
					</td>
						<?php
					}
					?>
					<?php
					if ( AIOSEOPPRO ) {
						?>
					<xsl:if test="$sitemapType='video'">
						<td>
							<xsl:value-of select="count(video:video)"/>
						</td>
						<td>
							<xsl:if test="$sitemapType='video'">
								<xsl:for-each select="video:video">
									<xsl:variable name="thumbURL">
										<xsl:value-of select="video:thumbnail_loc"/>
									</xsl:variable>
									<xsl:variable name="playURL">
										<xsl:value-of select="video:player_loc"/>
									</xsl:variable>
									<xsl:if test="$thumbURL != ''">
										<div style="float: left; width:60px;">
											<a href="{$playURL}" target="_new"><img src="{$thumbURL}"/></a>
										</div>
									</xsl:if>
								</xsl:for-each>
							</xsl:if>
						</td>
					</xsl:if>
						<?php
					}
					?>
					<td>
						<xsl:if test="string(number(sitemap:priority))!='NaN'">
							<xsl:value-of select="concat(sitemap:priority*100,'%')"/>
						</xsl:if>
					</td>
					<td>
						<xsl:value-of select="concat(translate(substring(sitemap:changefreq, 1, 1),concat($lower, $upper),concat($upper, $lower)),substring(sitemap:changefreq, 2))"/>
					</td>
					<td>
						<xsl:value-of select="concat(substring(sitemap:lastmod,0,11),concat(' ', substring(sitemap:lastmod,12,5)))"/>
					</td>
					<td>
					</td>
				</tr>
			</xsl:for-each>
			</tbody>
		</table>
	</xsl:template>
</xsl:stylesheet>
<?php
