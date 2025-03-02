# WearBrands Landing Page Developer Guide

## Project Structure
- `old_site_version/`: Previous HTML site files
- `statics/img/`: Image assets for the site
- Root directory contains informational markdown files

## Commands
- Site is static HTML, no build commands required
- For local development: Use a simple HTTP server
  ```
  python -m http.server 8000
  ```

## Code Style Guidelines
- **HTML**: 4 space indentation, lowercase tags
- **CSS**: Prefer external stylesheets over inline styles
- **Image assets**: Store in statics/img/ directory
- **Naming**: Use descriptive kebab-case for filenames
- **Documentation**: Update README.md when adding significant features
- **Commits**: Write clear commit messages describing changes

## Development Notes
- The site is currently static HTML with no JS framework
- Spanish language content should follow proper grammar and punctuation
- Minimize external dependencies when possible