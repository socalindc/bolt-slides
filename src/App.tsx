import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Cover from './components/Cover';
import StatGrid from './components/StatGrid';
import BigNumber from './components/BigNumber';
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

export default function App() {
  return (
    <Deck id="stick-lease-review">
      <Cover
        nav="Cover"
        kicker="Renaud Consulting · The Kelvin · Internal"
        title={
          <>
            <span className="accent-text">The Stick</span> — lease review
          </>
        }
        subtitle="Where the v3 draft stands, what must change before v4, and the path to signature."
        foot="1250 Half Street SE, Navy Yard · v3 draft of 7/15/26 · reviewed against the executed LOI · July 16, 2026"
        notes="Frame: the deal is in good shape — tenant signed the LOI, landlord countersigned, construction is authorized. This review is about getting the lease document to match the deal."
      />

      <StatGrid
        nav="Snapshot"
        kicker="Deal snapshot"
        title="The deal both sides already signed"
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
        center
        nav="What's right"
        notes="Give Jo and Michael credit first — the three hard business points all landed. Then pivot: the problems are mechanical, not conceptual."
      >
        <p className="kicker" style={{ marginInline: 'auto' }}>
          Credit where due
        </p>
        <h2
          className="headline"
          style={{ marginInline: 'auto', textAlign: 'center' }}
        >
          The 7/15 revisions got the big things right.
        </h2>
        <Build at={1}>
          <p className="lead" style={{ marginInline: 'auto', textAlign: 'center' }}>
            <strong>NNN on-grade only</strong> — the basement is out of Taxes,
            OpEx, and proportionate share, exactly per the 7/15 direction.
          </p>
        </Build>
        <Build at={2}>
          <p className="lead" style={{ marginInline: 'auto', textAlign: 'center' }}>
            <strong>The guaranty burndown matches the LOI</strong> — 3-year
            rolling, stepping to 9 / 6 / 3 months at years 5, 7, and 9.
          </p>
        </Build>
        <Build at={3}>
          <p className="lead" style={{ marginInline: 'auto', textAlign: 'center' }}>
            <strong>Tom’s Watch Bar protection is fully carried</strong> —
            sports-bar prohibition, Exhibit L, and the patio license all
            conditioned on it.
          </p>
        </Build>
      </Slide>

      <BigNumber
        nav="The error"
        kicker="But the schedule is wrong"
        value={<CountUp to={93904} prefix="$" />}
        caption={
          <>
            of phantom rent in the draft’s 10-year schedule. Every row is
            computed on Chicken &amp; Whiskey’s <strong>3,210 RSF</strong> — not
            the <strong>3,061 RSF</strong> this lease demises.
          </>
        }
        foot="§4(a)(ii) published annuals vs $55.00 × 3,061 RSF at 3% compounding — corrected schedule in the 7/16 abstract"
        notes="The drafters' own note — 'this does not match the excel support' — is still sitting in the lease text. Tenant's counsel will find this; better that v4 fixes it first."
      />

      <Split
        nav="Year by year"
        kicker="Rent schedule"
        title="The error compounds every year."
        body={
          <>
            <p>
              Year 1 shows <strong>$176,550</strong> — the correct figure is{' '}
              <strong>$168,355</strong>. By year 10 the gap is $10,685 a year,
              and the extension-term rows carry the same wrong footage.
            </p>
            <p className="subhead">
              The fix is mechanical: recompute all fifteen years on 3,061 RSF.
              The basement schedule is fine except one $1,000 typo in year 10.
            </p>
          </>
        }
        media={
          <div style={{ padding: '28px 24px', width: '100%' }}>
            <p className="kicker" style={{ marginBottom: 18 }}>
              Draft overcharge vs correct, $/yr
            </p>
            <BarChart data={rentOvercharge} height={230} />
          </div>
        }
        notes="If asked: the deltas are published draft annuals minus rate × 3,061. The draft table even disagrees with its own per-RSF column."
      />

      <Slide
        nav="Corrected"
        notes="This is the table that goes in the fix-list email — v4's Exhibit math, precomputed. Full 15-year schedule is in the abstract."
      >
        <p className="kicker" style={{ textAlign: 'center' }}>
          The corrected schedule
        </p>
        <h2
          className="headline"
          style={{ textAlign: 'center', marginInline: 'auto', marginBottom: 28 }}
        >
          What v4’s rent table must say.
        </h2>
        <Table
          columns={[
            'Lease year',
            { label: 'Draft (3,210 RSF)', align: 'right' },
            { label: 'Correct (3,061 RSF)', align: 'right' },
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
          caption="On-grade base rent · $55.00 start · 3% compounding · corrected figures recomputed independently, 7/16 abstract"
        />
      </Slide>

      <Contrast
        nav="LOI conformity"
        kicker="Checked term by term"
        title="Three places the draft left the signed deal"
        left={{
          label: 'v3 draft says',
          title: 'Re-traded in drafting',
          points: [
            'Guaranty capped at 12 months — cuts Y1–5 coverage by two-thirds',
            'Second renewal: the GREATER of 103% or market — a floor, no ceiling',
            'Radius blocks ANY tavern concept within 2 miles',
          ],
        }}
        right={{
          label: 'Executed LOI says',
          title: 'What v4 must restore',
          points: [
            'Guaranty of base + NNN with the burndown — no cap',
            'Second renewal: market rent CAPPED at 106% of the last year',
            'Radius blocks another “The Stick” only',
          ],
        }}
        notes="Flag one and two protect opposite sides — the cap hurts the landlord, the renewal flip hurts the tenant. Fixing both keeps v4 clean and credible. Radius is a business call: hold it or conform it."
      />

      <Slide
        nav="Fix list"
        notes="This table is the email to Jo and Michael Long — items ranked by dollars. The full 14-item list lives in the abstract."
      >
        <p className="kicker" style={{ textAlign: 'center' }}>
          The v4 punch list
        </p>
        <h2
          className="headline"
          style={{ textAlign: 'center', marginInline: 'auto', marginBottom: 28 }}
        >
          Seven fixes before this can circulate.
        </h2>
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
            ['5', 'Resolve TI conflict: §2(a) no-basement-allowance vs Exhibit B $48,850', '§2(a) · Exh. B'],
            ['6', 'Strip six live drafting notes; reinstate Exhibits I-1 / I-2', 'Body · Exh. E/I'],
            ['7', 'Kill dead dates — 2018 preamble, July 2020 outside delivery', 'Preamble · §3(a)'],
          ]}
          highlightRow={0}
          caption="Ranked by dollars at stake · full 14-item list in the 2026-07-16 abstract"
        />
      </Slide>

      <Slide
        center
        nav="Open items"
        notes="None of these block sending the fix list — but all three must close before execution."
      >
        <p className="kicker" style={{ marginInline: 'auto' }}>
          Still open
        </p>
        <h2
          className="headline"
          style={{ marginInline: 'auto', textAlign: 'center' }}
        >
          Three confirmations before execution.
        </h2>
        <Build at={1}>
          <p className="lead" style={{ marginInline: 'auto', textAlign: 'center' }}>
            <strong>Commercial Lot RSF</strong> — the body’s 10.73% share and
            Exhibit D’s 5.36% imply different buildings. One measured total
            settles it.
          </p>
        </Build>
        <Build at={2}>
          <p className="lead" style={{ marginInline: 'auto', textAlign: 'center' }}>
            <strong>Second guarantor</strong> — Exhibit G’s signature block is
            blank; confirm Laura Krahl holds ≥20% and name her.
          </p>
        </Build>
        <Build at={3}>
          <p className="lead" style={{ marginInline: 'auto', textAlign: 'center' }}>
            <strong>EagleBank as LOC issuer</strong> — the lease requires an A-
            / well-capitalized bank; confirm before the letter is cut.
          </p>
        </Build>
      </Slide>

      <Slide
        nav="Path"
        notes="Construction is already authorized at tenant risk — the lease is the long pole, not the buildout."
      >
        <p className="kicker" style={{ textAlign: 'center' }}>
          From redline to ribbon
        </p>
        <h2
          className="headline"
          style={{ textAlign: 'center', marginInline: 'auto', marginBottom: 24 }}
        >
          The path to opening day.
        </h2>
        <Timeline
          items={[
            {
              time: 'Jul 16',
              title: 'Abstract + fix list delivered',
              body: 'v3 reviewed against the executed LOI; seven-point punch list to Jo Rathbun and Michael Long.',
            },
            {
              time: 'Jul',
              title: 'v4 redraft — landlord side',
              body: 'Jair Lynch counsel conforms schedules, exhibits, and the three LOI deviations.',
            },
            {
              time: 'Aug',
              title: 'Tenant counsel sign-off',
              body: 'Antonio Hurley and counsel confirm the corrected draft; open confirmations close.',
            },
            {
              time: 'Fall',
              title: 'Execution',
              body: 'LOC delivered, guaranty signed, lease commencement within 30 days.',
            },
            {
              time: 'Late Feb',
              title: 'The Stick opens',
              body: 'CORE construction has been authorized at tenant risk since 6/15 — buildout is already moving.',
            },
          ]}
        />
      </Slide>

      <Slide
        center
        nav="Next"
        notes="One ask: green-light the fix-list email. Everything else follows from it."
      >
        <img
          src="/renaud-fullcolor.svg"
          alt="Renaud Consulting"
          style={{
            width: 'min(210px, 40vw)',
            marginInline: 'auto',
            marginBottom: 18,
            display: 'block',
          }}
        />
        <p className="kicker" style={{ marginInline: 'auto' }}>
          Next step
        </p>
        <h2
          className="display"
          style={{ marginInline: 'auto', textAlign: 'center' }}
        >
          Send the fix list to <span className="accent-text">Jo &amp; Michael</span>.
        </h2>
        <p
          className="lead"
          style={{ marginInline: 'auto', textAlign: 'center', maxWidth: '46ch' }}
        >
          The deal is signed and the concept is under construction — the lease
          just has to say what both sides already agreed. Seven fixes, one
          redraft, done.
        </p>
      </Slide>
    </Deck>
  );
}
