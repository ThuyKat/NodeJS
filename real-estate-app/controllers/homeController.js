import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const listings = JSON.parse(readFileSync(join(__dirname, '../data/listings.json'), 'utf-8'));

export function homeController(req, res) {
  const { listingType, filters } = req.params;
  const { maxBeds, minBeds, page } = req.query;
  const pageNumber = parseInt(page) || 1;

  // Parse filters only when provided
  let propertyTypes = null;
  let minPrice = null;
  let maxPrice = null;

  if (filters) {
    const parts = filters.split('-between-');
    propertyTypes = parts[0].replace('property-', '').split('-');
    if (parts[1]) [minPrice, maxPrice] = parts[1].split('-');
  }

  let results = listings.filter((listing) => {
    if (listing.listingType !== listingType) return false;
    if (propertyTypes && !propertyTypes.includes(listing.propertyType)) return false;
    if (minPrice && listing.price < Number(minPrice)) return false;
    if (maxPrice && Number(maxPrice) > 0 && listing.price > Number(maxPrice)) return false;
    if (maxBeds && listing.bedrooms > Number(maxBeds)) return false;
    if (minBeds && listing.bedrooms < Number(minBeds)) return false;
    return true;
  });

  res.json({ total: results.length, page: pageNumber, listings: results });
}
