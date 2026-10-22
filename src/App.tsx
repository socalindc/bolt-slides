import type { ReactNode } from 'react';
import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Reveal from './deck/Reveal';
import StatGrid from './components/StatGrid';
import Split from './components/Split';
import CountUp from './components/CountUp';
import Contrast from './components/Contrast';
import Table from './components/Table';
import Timeline from './components/Timeline';
import { BarChart } from './components/Charts';

const rentOvercharge = [
  { label: 'Y1', value: 8195 },
  { label: 'Y2', value: 8441 },
  { label: 'Y3', value: 8696 },
  { label: 'Y4', value: 8955 },
  { label: 'Y5', value: 9214 },
  { label: 'Y6', value: 9500 },
  { label: 'Y7', value: 9776 },
  { label: 'Y8', value: 10069 },
  { label: 'Y9', value: 10374 },
  { label: 'Y10', value: 10685 },
];

function EditorialHeading({
  folio,
  eyebrow,
  title,
  detail,
  className = '',
}: {
  folio: string;
  eyebrow: string;
  title: ReactNode;
  detail?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`editorial-heading ${className}`.trim()}>
      <div className="editorial-meta">
        <span className="editorial-folio">{folio}</span>
        <span className="editorial-eyebrow">{eyebrow}</span>
      </div>
      <h2>{title}</h2>
      {detail && <p>{detail}</p>}
    </header>
  );
}

function WireItem({
  number,
  title,
  source,
  action,
  children,
}: {
  number: string;
  title: string;
  source: string;
  action: string;
  children: ReactNode;
}) {
  return (
    <article className="wire-item">
      <span className="open-item-number">{number}</span>
      <div className="wire-copy">
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
      <div className="wire-status">
        <span>{source}</span>
        <strong>{action}</strong>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <Deck id="stick-lease-review-new-design">
      <Slide
        className="editorial-cover"
        nav="Cover"
        notes="Frame: the deal is in good shape — tenant signed the LOI, landlord countersigned, construction is authorized. This review is about getting the lease document to match the deal."
      >
        <div className="cover-brandline">
          <img src="/renaud-fullcolor.svg" alt="Renaud Consulting" />
          <span>Lease review / working session</span>
        </div>

        <div className="cover-composition">
          <div className="cover-side-note" aria-hidden="true">
            <span>RC / 26</span>
            <span>Navy Yard</span>
          </div>
          <div className="cover-copy">
            <Reveal>
              <p className="cover-eyebrow">The Kelvin · 1250 Half Street SE</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="cover-title">
                <span>The Stick</span>
                <em>lease review</em>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="cover-deck">
                What the v3 draft gets right, what must change before v4, and
                the shortest path to signature.
              </p>
            </Reveal>
          </div>
          <div className="cover-mark" aria-hidden="true">
            <span>V3</span>
            <i />
            <span>V4</span>
          </div>
        </div>

        <Reveal delay={0.28} className="cover-data-line">
          <span>Reviewed against executed LOI</span>
          <span>Draft dated 07.15.26</span>
          <span>Issued 07.16.26</span>
          <span>Internal</span>
        </Reveal>
      </Slide>

      <StatGrid
        nav="Snapshot"
        kicker="02 / the signed deal"
        title="The economics, at a glance"
        stats={[
          {
            value: <CountUp to={4038} />,
            label: 'RSF demised',
            caption: '3,061 on-grade + 977 basement',
          },
          {
            value: '$55 / $20',
            label: 'Year-1 base PSF',
            caption: 'on-grade / basement · 3% annual',
          },
          {
            value: '10 + 5 + 5',
            label: 'Term, years',
            caption: 'two five-year options',
          },
          {
            value: <CountUp to={201900} prefix="$" />,
            label: 'Tenant allowance',
            caption: '$50/SF × 4,038 — matches the executed LOI',
          },
          {
            value: '~$252K',
            label: 'Letter of credit',
            caption: "12 months' base + NNN · full term",
          },
          {
            value: '7.5%',
            label: 'Percentage rent',
            caption: 'natural breakpoint · $75K cap over base',
          },
        ]}
        notes="LOI v4 was fully executed — Antonio Hurley 6/12, Jair Lynch 6/24. These six numbers are the deal; everything that follows is about the draft matching them."
      />

      <Slide
        className="affirmation-slide"
        nav="What's right"
        notes="Give Jo and Michael credit first — the three hard business points all landed. Then pivot: the problems are mechanical, not conceptual."
      >
        <EditorialHeading
          folio="03"
          eyebrow="What landed"
          title="The 7/15 revisions got the big things right."
          detail="Start with the points already resolved. The remaining work is document control, not deal-making."
        />
        <div className="affirmation-list">
          <Build at={1}>
            <article className="affirmation-row">
              <span>01</span>
              <p>
                <strong>NNN on-grade only.</strong> The basement is out of
                Taxes, OpEx, and proportionate share, exactly per the 7/15
                direction.
              </p>
            </article>
          </Build>
          <Build at={2}>
            <article className="affirmation-row">
              <span>02</span>
              <p>
                <strong>The guaranty burndown matches the LOI.</strong> Three-year
                rolling, stepping to 9 / 6 / 3 months at years 5, 7, and 9.
              </p>
            </article>
          </Build>
          <Build at={3}>
            <article className="affirmation-row">
              <span>03</span>
              <p>
                <strong>Tom’s Watch Bar protection is fully carried.</strong>
                Sports-bar prohibition, Exhibit L, and the patio license all
                condition on it.
              </p>
            </article>
          </Build>
        </div>
      </Slide>

      <Slide
        className="dossier-slide"
        nav="The error"
        notes="The drafters' own note — 'this does not match the excel support' — is still sitting in the lease text. Tenant's counsel will find this; better that v4 fixes it first."
      >
        <div className="dossier-ticker">
          <span>Material discrepancy</span>
          <span>Case 04 — Base rent schedule</span>
          <span>§4(a)(ii)</span>
        </div>
        <div className="dossier-composition">
          <div className="dossier-finding">
            <Reveal>
              <div className="dossier-stamp">Rent file / variance confirmed</div>
            </Reveal>
            <Reveal delay={0.06}>
              <h2>
                Phantom rent in the
                <em>10-year schedule.</em>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="dossier-number">
                <CountUp to={93904} prefix="$" />
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <p>
                Every row uses Chicken &amp; Whiskey’s <strong>3,210 RSF</strong>,
                not the <strong>3,061 RSF</strong> demised in this lease.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="dossier-evidence">
            <div className="dossier-tab">Evidence / RSF-001</div>
            <dl>
              <div>
                <dt>Draft basis</dt>
                <dd>3,210 RSF</dd>
              </div>
              <div>
                <dt>Executed basis</dt>
                <dd>3,061 RSF</dd>
              </div>
              <div>
                <dt>Phantom area</dt>
                <dd>+149 RSF</dd>
              </div>
              <div className="is-material">
                <dt>10-year exposure</dt>
                <dd>$93,903.60</dd>
              </div>
              <div>
                <dt>Required action</dt>
                <dd>Recompute all 15 years</dd>
              </div>
            </dl>
            <div className="dossier-file-code" aria-hidden="true">
              <i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i />
            </div>
          </Reveal>
        </div>
        <div className="dossier-foot">
          <span>Published annuals vs. $55.00 × 3,061 RSF at 3% compounding</span>
          <strong>Confirmed / 07.16.26 abstract</strong>
        </div>
      </Slide>

      <Split
        nav="Year by year"
        kicker="05 / rent schedule"
        title="The error compounds every year."
        body={
          <>
            <p>
              Year 1 shows <strong>$176,550</strong>; the correct figure is{' '}
              <strong>$168,355</strong>. By year 10, the annual gap reaches
              $10,685.
            </p>
            <p className="rent-fix">
              Recompute all fifteen years on 3,061 RSF. The basement schedule
              is otherwise sound, apart from one $1,000 typo in year 10.
            </p>
          </>
        }
        media={
          <div className="rent-chart">
            <div className="rent-chart-head">
              <span>Draft overcharge</span>
              <span>$/year</span>
            </div>
            <BarChart data={rentOvercharge} height={260} />
            <div className="rent-chart-range">
              <span>$8,195</span>
              <i />
              <span>$10,685</span>
            </div>
          </div>
        }
        notes="If asked: the deltas are published draft annuals minus rate × 3,061. The draft table even disagrees with its own per-RSF column."
      />

      <Slide
        className="table-slide corrected-slide ledger-slide"
        nav="Corrected"
        notes="This is the table that goes in the fix-list email — v4's Exhibit math, precomputed. Full 15-year schedule is in the abstract."
      >
        <header className="ledger-heading">
          <div className="ledger-title">
            <div className="editorial-meta">
              <span className="editorial-folio">06</span>
              <span className="editorial-eyebrow">Corrected rent ledger</span>
            </div>
            <h2>What v4’s rent table must say.</h2>
          </div>
          <div className="ledger-balance">
            <span>Variance to remove</span>
            <strong>$93,903.60</strong>
            <small>10-year on-grade total</small>
          </div>
        </header>
        <Table
          columns={[
            'Lease year',
            { label: 'Draft / 3,210 RSF', align: 'right' },
            { label: 'Correct / 3,061 RSF', align: 'right' },
            { label: 'Overcharge', align: 'right' },
          ]}
          rows={[
            ['Year 1', '$176,550.00', '$168,355.00', '$8,195.00'],
            ['Year 3', '$187,303.50', '$178,607.82', '$8,695.68'],
            ['Year 5', '$198,699.00', '$189,485.04', '$9,213.96'],
            ['Year 7', '$210,800.70', '$201,024.67', '$9,776.03'],
            ['Year 10', '$230,349.60', '$219,665.09', '$10,684.51'],
            ['10-year total', '$2,023,905.00', '$1,930,001.40', '$93,903.60'],
          ]}
          highlightCol={2}
          highlightRow={5}
          caption="On-grade base rent · $55.00 start · 3% compounding · independently recomputed 07.16.26"
        />
      </Slide>

      <Contrast
        className="term-contrast-slide"
        nav="LOI conformity"
        kicker="07 / contract conformity"
        title="The draft versus the deal actually signed."
        left={{
          label: 'V3 draft / departed',
          title: 'Re-traded on paper',
          points: [
            'Guaranty capped at 12 months — cuts Y1–5 coverage by two-thirds',
            'Second renewal: the greater of 103% or market — a floor, no ceiling',
            'Radius blocks any tavern concept within two miles',
          ],
        }}
        right={{
          label: 'Executed LOI / controls',
          title: 'Restore the signed terms',
          points: [
            'Guaranty of base + NNN with the burndown — no cap',
            'Second renewal: market rent capped at 106% of the last year',
            'Radius blocks another “The Stick” only',
          ],
        }}
        notes="Flag one and two protect opposite sides — the cap hurts the landlord, the renewal flip hurts the tenant. Fixing both keeps v4 clean and credible. Radius is a business call: hold it or conform it."
      />

      <Slide
        className="table-slide fix-list-slide"
        nav="Fix list"
        notes="This table is the email to Jo and Michael Long — items ranked by dollars. The full 14-item list lives in the abstract."
      >
        <EditorialHeading
          folio="08"
          eyebrow="The v4 punch list"
          title="Seven fixes before this can circulate."
          className="compact"
        />
        <Table
          columns={[
            { label: '#', align: 'center' },
            'Fix',
            'Where',
          ]}
          rows={[
            ['1', 'Recompute the on-grade schedule on 3,061 RSF', '§4(a)(ii)'],
            ['2', 'Strike the 12-month guaranty cap; keep the burndown', 'Exhibit G(A)'],
            ['3', 'Second-renewal rent → market capped at 106%', '§3(b)'],
            ['4', 'Conform Exhibit D — still recites 3,210 RSF / 5.36% TPS', 'Exhibit D'],
            ['5', 'Resolve TI conflict: no basement allowance vs. $48,850', '§2(a) · Exh. B'],
            ['6', 'Strip six live drafting notes; reinstate Exhibits I-1 / I-2', 'Body · Exh. E/I'],
            ['7', 'Kill dead dates — 2018 preamble, July 2020 outside delivery', 'Preamble · §3(a)'],
          ]}
          highlightRow={0}
          caption="Ranked by dollars at stake · full 14-item list in the 07.16.26 abstract"
        />
      </Slide>

      <Slide
        className="open-items-slide"
        nav="Open items"
        notes="None of these block sending the fix list — but all three must close before execution."
      >
        <EditorialHeading
          folio="09"
          eyebrow="The closing wire"
          title="Three confirmations still open."
          detail="None blocks the fix-list email. Route each to an owner before execution."
        />
        <div className="open-items-wire">
          <Build at={1}>
            <WireItem
              number="01"
              title="Commercial Lot RSF"
              source="Body §4 / Exhibit D"
              action="Measure"
            >
              The body’s 10.73% share and Exhibit D’s 5.36% imply different
              buildings. One measured total settles it.
            </WireItem>
          </Build>
          <Build at={2}>
            <WireItem
              number="02"
              title="Second guarantor"
              source="Exhibit G"
              action="Name"
            >
              Exhibit G’s signature block is blank. Confirm Laura Krahl holds
              at least 20% and name her.
            </WireItem>
          </Build>
          <Build at={3}>
            <WireItem
              number="03"
              title="EagleBank as LOC issuer"
              source="LOC requirements"
              action="Approve"
            >
              The lease requires an A- / well-capitalized bank. Confirm before
              the letter is cut.
            </WireItem>
          </Build>
        </div>
      </Slide>

      <Slide
        className="timeline-slide"
        nav="Path"
        notes="Construction is already authorized at tenant risk — the lease is the long pole, not the buildout."
      >
        <EditorialHeading
          folio="10"
          eyebrow="From redline to ribbon"
          title="The path to opening day."
          className="compact"
        />
        <Timeline
          items={[
            {
              time: 'Jul 16',
              title: 'Fix list delivered',
              body: 'v3 checked against the executed LOI; seven-point punch list issued.',
            },
            {
              time: 'Jul',
              title: 'Landlord v4',
              body: 'Counsel conforms schedules, exhibits, and the three LOI deviations.',
            },
            {
              time: 'Aug',
              title: 'Tenant sign-off',
              body: 'Corrected draft confirmed; open closing items resolved.',
            },
            {
              time: 'Fall',
              title: 'Execution',
              body: 'LOC delivered, guaranty signed, commencement within 30 days.',
            },
            {
              time: 'Late Feb',
              title: 'The Stick opens',
              body: 'CORE construction has been moving at tenant risk since June 15.',
            },
          ]}
        />
      </Slide>

      <Slide
        className="closing-slide"
        nav="Next"
        notes="One ask: green-light the fix-list email. Everything else follows from it."
      >
        <div className="closing-brandline">
          <img src="/renaud-fullcolor.svg" alt="Renaud Consulting" />
          <span>11 / decision</span>
        </div>
        <div className="closing-composition">
          <p className="closing-eyebrow">Next move</p>
          <h2>
            Send the fix list
            <em>to Jo &amp; Michael.</em>
          </h2>
          <p>
            The deal is signed and the concept is under construction. The lease
            now needs to say what both sides already agreed.
          </p>
        </div>
        <div className="closing-proof">
          <span>Seven fixes</span>
          <span>One redraft</span>
          <span>Then execute</span>
        </div>
      </Slide>
    </Deck>
  );
}
