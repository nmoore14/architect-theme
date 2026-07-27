package fixtures

import (
	"context"
	"errors"
	"fmt"
)

const MaxAttempts = 3

type Identifiable interface {
	ID() string
}

type Store[T Identifiable] struct {
	items map[string]T
}

func NewStore[T Identifiable]() *Store[T] {
	return &Store[T]{items: make(map[string]T)}
}

func (s *Store[T]) Find(ctx context.Context, id string) (T, error) {
	// Respect cancellation before reading shared state.
	var zero T
	select {
	case <-ctx.Done():
		return zero, fmt.Errorf("find %q: %w", id, ctx.Err())
	default:
	}
	item, ok := s.items[id]
	if !ok {
		return zero, errors.New("item not found")
	}
	return item, nil
}
