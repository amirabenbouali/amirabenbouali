import {
  foundryDomains,
  foundryPostmortem,
  getDomainById,
  getFoundryMemorySignature,
  getIncidentReadiness
} from '../foundry/foundrySystem';
import type { FoundryPhaseSnapshot } from '../foundry/foundrySystem';
import type { useFoundryState } from '../foundry/useFoundryState';
import styles from '../DreamExperience.module.css';

type FoundryControlsProps = {
  foundry: ReturnType<typeof useFoundryState>;
  snapshot: FoundryPhaseSnapshot;
};

export function FoundryControls({ foundry, snapshot }: FoundryControlsProps) {
  const inspected = getDomainById(foundry.inspectedDomain) ?? foundryDomains[0];
  const readiness = getIncidentReadiness(inspected, snapshot, foundry.ownershipAligned);
  const memory = getFoundryMemorySignature();

  return (
    <div className={styles.foundryControls}>
      <p className={styles.systemMeta} aria-live="polite">
        {snapshot.stage} / inspected {inspected.label} / {readiness}
      </p>
      <button type="button" className={styles.editorialAction} onClick={foundry.ownershipAligned ? foundry.resetOwnership : foundry.alignOwnership}>
        {foundry.ownershipAligned ? 'Loosen ownership alignment' : 'Align unclear ownership'}
      </button>
      <div className={styles.controlGroup}>
        <span>Inspect readiness</span>
        <div className={styles.segmentedControls} aria-label="Inspect Foundry readiness">
          {foundryDomains.map((domain) => (
            <button
              key={domain.id}
              type="button"
              aria-pressed={foundry.inspectedDomain === domain.id}
              onClick={() => foundry.setInspectedDomain(domain.id)}
            >
              {domain.label}
            </button>
          ))}
        </div>
      </div>
      <dl className={styles.foundryStatusList}>
        <div>
          <dt>Owner</dt>
          <dd>{inspected.owner === 'unclear' && foundry.ownershipAligned ? 'Product Systems' : inspected.owner.replace('-', ' ')}</dd>
        </div>
        <div>
          <dt>Readiness</dt>
          <dd>{readiness}</dd>
        </div>
        <div>
          <dt>Memory</dt>
          <dd>
            {memory.identity} becomes the {memory.nextInheritance}
          </dd>
        </div>
      </dl>
      {snapshot.reflection > 0.35 ? (
        <div className={styles.postmortemNote}>
          <p>Incident: {foundryPostmortem.incident}</p>
          <p>Impact: {foundryPostmortem.impact}</p>
          <p>Response: {foundryPostmortem.response}</p>
          <p>Change: {foundryPostmortem.change}</p>
        </div>
      ) : null}
    </div>
  );
}
