import { test, expect } from '@playwright/test';

test.describe('Portfolio Website', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
  });

  test('should display hero section with correct title', async ({ page }) => {
    await expect(page.getByTestId('hero-name')).toHaveText(/Or Delevski/);
    await expect(page.getByTestId('hero-title')).toHaveText('CTO / VP R&D & Technology Leader');
  });

  test('should have working navigation', async ({ page }) => {
    // Check if mobile viewport
    const viewportSize = page.viewportSize();
    const isMobile = viewportSize && viewportSize.width < 768;
    
    // Helper function to get navigation link
    const getNavLink = async (name: string) => {
      if (isMobile) {
        // Open mobile menu if not already open
        const mobileNav = page.getByTestId('mobile-nav');
        const isVisible = await mobileNav.isVisible().catch(() => false);
        if (!isVisible) {
          const menuButton = page.getByRole('button', { name: 'Menu' });
          await menuButton.click();
          await expect(mobileNav).toBeVisible();
        }
        return mobileNav.getByRole('link', { name });
      }
      return page.getByRole('link', { name }).first();
    };
    
    // Test navigation links
    const aboutLink = await getNavLink('About');
    await aboutLink.click();
    await expect(page.locator('#about')).toBeVisible();
    
    const projectsLink = await getNavLink('Projects');
    await projectsLink.click();
    await expect(page.locator('#projects')).toBeVisible();
    
    const contactLink = await getNavLink('Contact');
    await contactLink.click();
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should toggle dark mode', async ({ page }) => {
    const toggle = page.getByRole('button', { name: 'Toggle theme' });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('should display projects section', async ({ page }) => {
    // Check if mobile viewport
    const viewportSize = page.viewportSize();
    const isMobile = viewportSize && viewportSize.width < 768;
    
    if (isMobile) {
      const menuButton = page.getByRole('button', { name: 'Menu' });
      await menuButton.click();
      await expect(page.getByTestId('mobile-nav')).toBeVisible();
      const projectsLink = page.getByTestId('mobile-nav').getByRole('link', { name: 'Projects' });
      await projectsLink.click();
    } else {
      const projectsLink = page.getByRole('link', { name: 'Projects' }).first();
      await projectsLink.click();
    }
    
    await expect(page.locator('#projects')).toBeVisible();
    
    // Check if projects are displayed
    await expect(page.locator('text=FastAPI AWS Ingestor')).toBeVisible();
    await expect(page.locator('text=CRM PRO VB')).toBeVisible();
    await expect(page.locator('text=Scrape Websites')).toBeVisible();
  });

  test('should have working contact form', async ({ page }) => {
    // Check if mobile viewport
    const viewportSize = page.viewportSize();
    const isMobile = viewportSize && viewportSize.width < 768;
    
    if (isMobile) {
      const menuButton = page.getByRole('button', { name: 'Menu' });
      await menuButton.click();
      await expect(page.getByTestId('mobile-nav')).toBeVisible();
      const contactLink = page.getByTestId('mobile-nav').getByRole('link', { name: 'Contact' });
      await contactLink.click();
    } else {
      const contactLink = page.getByRole('link', { name: 'Contact' }).first();
      await contactLink.click();
    }
    
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
    
    // Check download filename - actual file is cv.pdf
    expect(download.suggestedFilename()).toBe('cv.pdf');
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if mobile menu button is visible
    const menuButton = page.getByRole('button', { name: 'Menu' });
    await expect(menuButton).toBeVisible();
    
    // Click mobile menu
    await menuButton.click();
    
    // Check if mobile navigation is visible using test ID
    await expect(page.getByTestId('mobile-nav')).toBeVisible();
    await expect(page.getByTestId('mobile-nav').getByRole('link', { name: 'About' })).toBeVisible();
  });

  test('should have proper meta tags', async ({ page }) => {
    // Check title
    await expect(page).toHaveTitle(/Or Delevski.*CTO.*VP R&D/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /Innovative technology leader/);
  });

  test('should have GitHub links for projects', async ({ page }) => {
    // Check if mobile viewport
    const viewportSize = page.viewportSize();
    const isMobile = viewportSize && viewportSize.width < 768;
    
    if (isMobile) {
      const menuButton = page.getByRole('button', { name: 'Menu' });
      await menuButton.click();
      await expect(page.getByTestId('mobile-nav')).toBeVisible();
      const projectsLink = page.getByTestId('mobile-nav').getByRole('link', { name: 'Projects' });
      await projectsLink.click();
    } else {
      const projectsLink = page.getByRole('link', { name: 'Projects' }).first();
      await projectsLink.click();
    }
    
    // Check if GitHub links exist
    const githubLinks = page.locator('a[href*="github.com/delevski"]');
    await expect(githubLinks.first()).toBeVisible();
    
    // Count GitHub links
    const linkCount = await githubLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });
});
