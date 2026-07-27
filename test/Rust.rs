use std::{collections::HashMap, fmt::Display};

const MAX_RETRIES: u8 = 3;

#[derive(Debug, Clone)]
struct Record<T> {
    id: String,
    value: T,
    active: bool,
}

trait Repository<T> {
    fn find(&self, id: &str) -> Result<Option<&T>, RepositoryError>;
}

#[derive(Debug)]
enum RepositoryError {
    InvalidId(String),
    Unavailable,
}

struct MemoryRepository<T> {
    records: HashMap<String, T>,
}

impl<T: Display> Repository<T> for MemoryRepository<T> {
    fn find(&self, id: &str) -> Result<Option<&T>, RepositoryError> {
        // Empty identifiers are always programmer errors.
        if id.trim().is_empty() {
            return Err(RepositoryError::InvalidId(id.into()));
        }
        Ok(self.records.get(id))
    }
}

async fn load<T: Display>(repo: &impl Repository<T>, id: &str) -> Result<String, RepositoryError> {
    let value = repo.find(id)?.map(ToString::to_string).unwrap_or_default();
    Ok(format!("{value}:{MAX_RETRIES}"))
}
