import { test, expect } from '@playwright/test';

test.describe('Portfolio Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
  });

  test('should display hero section with correct title', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Or Delevski');
    await expect(page.locator('h2')).toContainText('CTO / VP R&D & Technology Leader');
  });

  test('should have working navigation', async ({ page }) => {
    // Test navigation links
    await page.click('text=About');
    await expect(page.locator('#about')).toBeVisible();
    
    await page.click('text=Projects');
    await expect(page.locator('#projects')).toBeVisible();
    
    await page.click('text=Contact');
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should toggle dark mode', async ({ page }) => {
    // Check if dark mode toggle exists
    const darkModeButton = page.locator('button').filter({ hasText: /sun|moon/i });
    await expect(darkModeButton).toBeVisible();
    
    // Click dark mode toggle
    await darkModeButton.click();
    
    // Check if dark class is added to html element
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should display projects section', async ({ page }) => {
    await page.click('text=Projects');
    await expect(page.locator('#projects')).toBeVisible();
    
    // Check if projects are displayed
    await expect(page.locator('text=FastAPI AWS Ingestor')).toBeVisible();
    await expect(page.locator('text=CRM PRO VB')).toBeVisible();
    await expect(page.locator('text=Scrape Websites')).toBeVisible();
  });

  test('should have working contact form', async ({ page }) => {
    await page.click('text=Contact');
    await expect(page.locator('#contact')).toBeVisible();
    
    // Fill contact form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="subject"]', 'Test Subject');
    await page.fill('textarea[name="message"]', 'Test message content');
    
    // Check if form fields are filled
    await expect(page.locator('input[name="name"]')).toHaveValue('Test User');
    await expect(page.locator('input[name="email"]')).toHaveValue('test@example.com');
  });

  test('should download CV when clicking download button', async ({ page }) => {
    // Set up download promise
    const downloadPromise = page.waitForEvent('download');
    
    // Click download button
    await page.click('text=Download CV');
    
    // Wait for download to start
    const download = await downloadPromise;
    
    // Check download filename
    expect(download.suggestedFilename()).toBe('Or_Delevski_CV.txt');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if mobile menu button is visible
    const menuButton = page.locator('button').filter({ hasText: /menu/i });
    await expect(menuButton).toBeVisible();
    
    // Click mobile menu
    await menuButton.click();
    
    // Check if mobile navigation is visible
    await expect(page.locator('text=About')).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Or Delevski.*CTO.*VP R&D/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Innovative technology leader/);
  });

  test('should have GitHub links for projects', async ({ page }) => {
    await page.click('text=Projects');
    
    // Check if GitHub links exist
    const githubLinks = page.locator('a[href*="github.com/delevski"]');
    await expect(githubLinks.first()).toBeVisible();
    
    // Count GitHub links
    const linkCount = await githubLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });
});
