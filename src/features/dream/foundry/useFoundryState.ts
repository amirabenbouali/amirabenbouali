import { useMemo, useState } from 'react';
import { foundryDomains, getFoundryMemorySignature } from './foundrySystem';
import type { FoundryDomainId } from './foundrySystem';

const defaultInspectedDomain: FoundryDomainId = 'core-platform';

export function resolveFoundryDomain(value: string | null): FoundryDomainId {
  return foundryDomains.some((domain) => domain.id === value) ? (value as FoundryDomainId) : defaultInspectedDomain;
}

export function useFoundryState() {
  const [ownershipAligned, setOwnershipAligned] = useState(false);
  const [inspectedDomain, setInspectedDomain] = useState<FoundryDomainId>(defaultInspectedDomain);
  const memory = useMemo(() => getFoundryMemorySignature(), []);

  return {
    ownershipAligned,
    alignOwnership: () => setOwnershipAligned(true),
    resetOwnership: () => setOwnershipAligned(false),
    inspectedDomain,
    setInspectedDomain,
    memory
  };
}
