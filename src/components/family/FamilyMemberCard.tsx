import type { FamilyMember } from '@/types/domain'
import { Tag } from '@/components/ui/Tag'
import { ProvenanceRow } from '@/components/provenance/ProvenanceRow'
import { CONSENT_LABEL, CONSENT_TONE } from './familyMeta'
import styles from './FamilyMemberCard.module.css'

export function FamilyMemberCard({ member }: { member: FamilyMember }) {
  return (
    <article className={styles.card}>
      <div className={styles.head}>
        <div>
          <p className="eyebrow">{member.relation}</p>
          <h4 className={styles.name}>{member.name}</h4>
        </div>
        <Tag tone={CONSENT_TONE[member.consent]} size="sm">
          {CONSENT_LABEL[member.consent]}
        </Tag>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={`${styles.statValue} mono`}>{member.journeyPercent}%</span>
          <span className={styles.statLabel}>Jornada reconstruída</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} mono`}>{member.protocolsCount}</span>
          <span className={styles.statLabel}>Protocolos</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} mono`}>{member.newConnections}</span>
          <span className={styles.statLabel}>Conexões novas</span>
        </div>
        <div className={styles.stat}>
          <span className={`${styles.statValue} mono`}>{member.pendingInfo}</span>
          <span className={styles.statLabel}>Info. pendentes</span>
        </div>
      </div>

      {member.sharedSignals.length > 0 && (
        <div className={styles.signals}>
          <p className="eyebrow">Sinais compartilhados</p>
          <ul className={styles.signalList}>
            {member.sharedSignals.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}

      <ProvenanceRow provenance={member.provenance} compact />
    </article>
  )
}
