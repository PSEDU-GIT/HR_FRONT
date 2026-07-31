import Step3TermsArea from './_area/Step3Terms.area';
import Step3SideArea from './_area/Step3Side.area';

export default function WizardStep3Page() {
  return (
    <div className="flex items-start">
      <section className="flex-1">
        <Step3TermsArea />
      </section>

      <Step3SideArea />
    </div>
  );
}
