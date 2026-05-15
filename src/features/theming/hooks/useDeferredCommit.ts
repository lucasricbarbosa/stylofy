import { useCallback, useRef, useState } from "react";

export function useDeferredCommit<T>(
  committed: T,
  onCommit: (next: T) => void,
): [T, (v: T) => void, () => void] {
  const [draft, setDraft] = useState<T>(committed);
  const draftRef = useRef<T>(draft);

  const set = useCallback((v: T) => {
    draftRef.current = v;
    setDraft(v);
  }, []);

  const flush = useCallback(() => {
    onCommit(draftRef.current);
  }, [onCommit]);

  // Keep draft in sync with external committed changes (undo, preset apply, etc.)
  const committedRef = useRef(committed);
  if (committed !== committedRef.current) {
    committedRef.current = committed;
    draftRef.current = committed;
    // setDraft is a side effect; we need it in render but React allows this pattern
    // when guarded by a ref comparison.
    if (draft !== committed) {
      setDraft(committed);
    }
  }

  return [draft, set, flush];
}
