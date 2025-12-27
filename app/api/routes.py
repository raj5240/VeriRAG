from fastapi import APIRouter
from app.models.schemas import QueryRequest, QueryResponse
from app.retrieval.retriever import retrieve

router = APIRouter()

@router.post("/query", response_model=QueryResponse)
def query_rag(request: QueryRequest):
    results = retrieve(request.question)
    return {
        "question": request.question,
        "results": results
    }
