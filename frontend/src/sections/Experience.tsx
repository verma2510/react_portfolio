import { Container } from '../components/layout/Container';
import { CareerTimeline } from '../components/experience/CareerTimeline';
import { RoleEntry } from '../components/experience/RoleEntry';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeader } from '../components/ui/SectionHeader';
import { buildCareerTimeline } from '../lib/content';

export function Experience() {
  const { roles } = buildCareerTimeline();

  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-bg-elev/60 py-20 md:py-24">
      <Container>
        <SectionHeader
          section="experience"
          eyebrow="Experience"
          title="Where I've"
          accent="shipped."
          lead="From generative-AI prototypes to production CRM, analytics and e-commerce platforms — most recent first."
        />
        <Reveal className="mb-6">
          <CareerTimeline />
        </Reveal>
        {roles.map((r, i) => (
          <RoleEntry key={r.entry.company} role={r} index={i} />
        ))}
      </Container>
    </section>
  );
}
