# VeriRAG 🚀  
## Trust-Aware Real-Time Retrieval-Augmented Generation System

VeriRAG is a **trust-aware, real-time Retrieval-Augmented Generation (RAG) system** designed to produce **accurate, grounded, and low-latency answers** by continuously ingesting data from multiple websites, verifying factual correctness, and ranking sources based on **topic-specific reliability**.

Traditional RAG systems rely on static embeddings and treat all sources equally. VeriRAG introduces **continuous ingestion, fact verification, and learned source trust**, allowing the system to improve correctness and performance over time.

---

## 1. Motivation & Problem Statement

Most existing RAG systems suffer from:

- ❌ Stale knowledge due to static embeddings  
- ❌ Hallucinated responses from unverified sources  
- ❌ High latency caused by querying too many sources  

**VeriRAG solves these issues by:**
- Fetching live data continuously
- Verifying facts before passing them to the LLM
- Ranking websites by trust and topic relevance
- Querying only the most reliable sources

---

## 2. Core Idea (In Simple Terms)

> “Continuously fetch data, verify facts across multiple sources, learn which websites are trustworthy for which topics, and generate answers only from those trusted sources.”

---

## 3. High-Level System Flow

Scheduled Data Fetch (Every Minute)
↓
Content Cleaning & Normalization
↓
Fact Extraction
↓
Cross-Source Fact Agreement
↓
LLM-Based Claim Verification
↓
Graph-Based Trust Propagation
↓
Topic-Wise Source Ranking
↓
Trusted Retrieval
↓
Grounded LLM Answer + Citations

yaml
Copy code

---

## 4. Offline vs Online Architecture

### Offline (Background Processing)
Runs continuously and does not affect user latency:

- Website & API ingestion
- Content normalization
- Fact extraction
- Fact agreement computation
- Trust graph construction
- Topic-wise source ranking
- ML-based ranking model training

### Online (Query-Time Processing)
Runs when a user asks a question and must be fast:

- Topic classification
- Top-K trusted source selection
- Semantic retrieval
- LLM-based answer generation

---

## 5. Data Ingestion (How Data Is Fetched)

- A scheduler triggers ingestion jobs every minute
- Data is fetched asynchronously from APIs and websites
- Only new or updated content is processed
- Deduplication is performed using content hashing

This ensures **fresh data with minimal redundant processing**.

---

## 6. Content Normalization & Fact Extraction

Raw web data (HTML, JSON) is converted into structured factual units.

### Example:
Raw text:
> “Model X was released in 2024 with 92% accuracy.”

Extracted fact:
```json
{
  "fact": "Model X was released in 2024",
  "source": "example.com",
  "topic": "AI",
  "timestamp": "2024-12-01"
}
This enables fact-level comparison across sources.

7. Cross-Source Fact Agreement (Correctness Layer)
A fact is considered more reliable if multiple independent sources report the same information.

How it works:
Facts are embedded

Semantically similar facts are clustered

Agreement score is assigned based on cluster size

Example:

bash
Copy code
5 agreeing sources → high confidence
1 isolated source → low confidence
8. LLM-Based Claim Verification
LLMs are used only for verification, not as a source of truth.

Each claim is evaluated against supporting facts and classified as:

✔ Supported

❌ Contradicted

⚠ Insufficient evidence

This signal directly affects source trust scores.

9. Graph-Based Trust Propagation
Trust relationships are modeled using a graph:

Nodes → Websites

Edges → Agreement on facts

Edge weights → Agreement strength

Highly trusted sources reinforce each other, while unreliable sources gradually lose trust.

10. Topic-Wise Source Ranking (Key Innovation)
Instead of a single global rank, each website is ranked per topic.

Example:
Website	AI	Finance
siteA	0.92	0.41
siteB	0.63	0.91

This enables accurate and efficient source selection.

11. Ranking Model (Learning Over Time)
A machine learning model (XGBoost / LightGBM) learns optimal ranking weights using:

Agreement scores

Contradiction rates

Freshness

Authority

Historical answer success

The system improves automatically with usage.

12. Query-Time Flow (Low Latency Path)
pgsql
Copy code
User Query
   ↓
Topic Classification
   ↓
Top-K Trusted Sources
   ↓
Semantic Retrieval
   ↓
LLM (Grounded Prompt)
   ↓
Answer + Citations
No crawling or ranking happens at query time.

13. Tech Stack
Backend & Orchestration
FastAPI

Celery + Celery Beat

AsyncIO

Data & Storage
PostgreSQL / MongoDB (raw data)

Qdrant (vector database)

Redis (cache)

Neo4j / adjacency tables (trust graph)

ML & AI
OpenAI / Llama-3

Sentence Transformers / BGE embeddings

XGBoost / LightGBM

Infrastructure
Docker

WebSockets / SSE for streaming

14. Why VeriRAG Is Different
Traditional RAG	VeriRAG
Static data	Real-time ingestion
No trust modeling	Topic-wise trust ranking
High latency	Selective retrieval
Hallucination-prone	Fact-verified answers

15. Project Status
🚧 Under Active Development

Current focus:

Fact agreement algorithms

Trust propagation logic

End-to-end prototype

16. Author
Raj Kiran
B.E. in Artificial Intelligence & Machine Learning
Competitive Programmer | Backend & ML Engineer