
import { ArrowRight, Users, Sparkles, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function DashboardPage() {
  return (
    <div className="dashboard-page">
      <section className="welcome-banner">
        <div className="welcome-copy">
          <div className="welcome-chip">
            <Sparkles size={14} /> YOUR PEOPLE WORKSPACE
          </div>
          <h2>Great teams start with <span>great people.</span></h2>
          <p>
            Your team directory, employee information, and people operations
            in one beautifully organized workspace.
          </p>
          <Link to="/employees" className="button welcome-button">
            Explore employees <ArrowRight size={17} />
          </Link>
        </div>

        <div className="welcome-art" aria-hidden="true">
          <div className="art-orbit orbit-one" />
          <div className="art-orbit orbit-two" />
          <div className="art-person person-one">AM</div>
          <div className="art-person person-two">JR</div>
          <div className="art-person person-three">SK</div>
          <div className="art-person person-four">+</div>
          <div className="art-center"><Users size={36} /></div>
        </div>
      </section>

      <div className="section-heading">
        <div>
          <h3>Your workspace</h3>
          <p>Everything you need to manage your team.</p>
        </div>
      </div>

      <div className="dashboard-shortcuts">
        <Link to="/employees" className="shortcut-card shortcut-purple">
          <div className="shortcut-icon"><Users size={22} /></div>
          <h3>Employee directory</h3>
          <p>Search team members, view their profiles, and manage employee information.</p>
          <span>Open directory <ArrowRight size={16} /></span>
        </Link>

        <article className="shortcut-card shortcut-green">
          <div className="shortcut-icon"><ShieldCheck size={22} /></div>
          <h3>People operations</h3>
          <p>Keep employee records organized and maintain a clear overview of your team.</p>
          <span className="shortcut-label">Workspace essentials</span>
        </article>
      </div>

      <section className="tip-banner">
        <div className="tip-symbol">✦</div>
        <div>
          <strong>A little tip for your workspace</strong>
          <p>Keep employee information up to date so your team directory stays useful.</p>
        </div>
      </section>
    </div>
  );
}
