import asyncio
from app.ingestion.fetcher import fetch_url
from app.ingestion.parser import parse_html

URLS = [
    "https://example.com"
]

async def run_ingestion():
    for url in URLS:
        html = await fetch_url(url)
        clean_text = parse_html(html)
        print(f"Ingested from {url} (length={len(clean_text)})")

if __name__ == "__main__":
    asyncio.run(run_ingestion())
