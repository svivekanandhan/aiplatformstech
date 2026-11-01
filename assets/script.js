const BLOG_POSTS = [
  {
    id: "kubernetes-debug-imagepullbackoff-crashloopbackoff",
    title: "How to Debug Kubernetes ImagePullBackOff and CrashLoopBackOff Errors: A Production Guide",
    date: "2026-11-01",
    category: "Kubernetes Operations",
    excerpt: "A production-first workflow to diagnose ImagePullBackOff and CrashLoopBackOff using structured kubectl troubleshooting.",
    url: "tech-blogs/kubernetes-debug-imagepullbackoff-crashloopbackoff/"
  },
  {
    id: "terraform-modules-aws-high-availability",
    title: "Structuring Production-Grade Terraform Modules for Highly Available AWS Architectures",
    date: "2026-11-01",
    category: "Terraform / AWS",
    excerpt: "Design safer, reusable Terraform modules with isolated state and HA-aware patterns for enterprise AWS environments.",
    url: "tech-blogs/terraform-modules-aws-high-availability/"
  },
  {
    id: "managed-vs-self-managed-kubernetes",
    title: "Managed vs. Self-Managed Kubernetes: Architectural Differences, Trade-offs, and How to Choose",
    date: "2026-10-31",
    category: "Kubernetes Strategy",
    excerpt: "A practical decision guide comparing managed and self-managed Kubernetes across operations, cost, customization, and team readiness.",
    content: `
      <p>Navigating container orchestration eventually leads every DevOps team to a fundamental infrastructure decision: <strong>Managed Kubernetes</strong> or <strong>Self-Managed Kubernetes</strong>.</p>
      <p>While both run the same underlying Kubernetes API, the operational burden, failure domains, and cost profiles of these two approaches are vastly different. This guide breaks down what each deployment model involves, how they differ structurally, and how to evaluate the right path for your engineering organization.</p>
      <h2>1. Defining the Approaches</h2>
      <h3>What is Managed Kubernetes?</h3>
      <p>In a <strong>Managed Kubernetes</strong> model, a cloud provider handles the underlying infrastructure and control plane operations.</p>
      <p>You interact with standard Kubernetes objects (<code>Pods</code>, <code>Services</code>, <code>Deployments</code>), but the cloud vendor manages component health, master node provisioning, <code>etcd</code> backups, core networking setup, and control plane patching.</p>
      <p><strong>Popular examples:</strong> AWS EKS, GCP GKE, Azure AKS, and DigitalOcean Kubernetes.</p>
      <h3>What is Self-Managed Kubernetes?</h3>
      <p>In a <strong>Self-Managed Kubernetes</strong> model (self-hosted/bare-metal), your team is responsible for the full stack.</p>
      <p>This includes provisioning servers or VMs, installing runtimes, configuring control plane components through tools like <code>kubeadm</code>, <code>kops</code>, or <code>Kubespray</code>, and handling zero-downtime upgrades.</p>
      <p><strong>Popular deployment tools:</strong> <code>kubeadm</code>, RKE2, OpenShift (bare-metal), <code>kops</code>, Kubespray.</p>
      <h2>2. Core Differences & Shared Responsibility Model</h2>
      <p>The fundamental distinction is the shared responsibility boundary.</p>
      <pre><code>+-------------------------------------------------------------------+
|                     APPLICATIONS & WORKLOADS                      |
|                  (Deployments, Services, RBAC)                    |
+-------------------------------------------------------------------+
|                        WORKER NODES & CNI                         |
|             (Kubelet, Container Runtime, Node Autoscaling)        |
+-------------------------------------------------------------------+
|                       CONTROL PLANE / MASTER                      |
|            (API Server, etcd, Scheduler, Controller)              |
+-------------------------------------------------------------------+
|                     PHYSICAL INFRASTRUCTURE                       |
|               (Servers, Storage, Hardware Networking)             |
+-------------------------------------------------------------------+

 [ Managed K8s: Provider manages Control Plane & Infrastructure ]
 [ Self-Managed K8s: Your team manages all 4 layers           ]</code></pre>
      <h3>Key Differences Breakdown</h3>
      <table>
        <thead>
          <tr>
            <th>Feature / Criteria</th>
            <th>Managed Kubernetes</th>
            <th>Self-Managed Kubernetes</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Control Plane Management</td>
            <td>Handled automatically by cloud provider.</td>
            <td>Provisioned, monitored, and backed up by your team.</td>
          </tr>
          <tr>
            <td><code>etcd</code> Maintenance</td>
            <td>Vendor-managed HA and snapshots.</td>
            <td>Manual replication, backup routines, and latency tuning.</td>
          </tr>
          <tr>
            <td>Upgrades & Patching</td>
            <td>Single-click or release-channel based automation.</td>
            <td>Manual control plane and node pool upgrade flow.</td>
          </tr>
          <tr>
            <td>Cluster Autoscaling</td>
            <td>Native cloud integration and managed tooling.</td>
            <td>Custom node pool setup and infra hooks.</td>
          </tr>
          <tr>
            <td>Hardware & OS Customization</td>
            <td>Limited to supported images/configs.</td>
            <td>Full control over kernel, hardware, and CNI stack.</td>
          </tr>
          <tr>
            <td>Cost Structure</td>
            <td>Predictable control plane fee + worker costs.</td>
            <td>Compute/hardware + significant engineering overhead.</td>
          </tr>
        </tbody>
      </table>
      <h2>3. Deep-Dive Comparison</h2>
      <h3>A. Operational Complexity & Upgrades</h3>
      <ul>
        <li><strong>Managed:</strong> Upgrading from <code>1.30</code> to <code>1.31</code> in EKS/GKE is typically an API/IaC-level action with cloud-managed control plane rollout.</li>
        <li><strong>Self-Managed:</strong> Requires node draining, package updates, <code>kubeadm upgrade plan</code>, <code>etcd</code> safety checks, and CNI compatibility validation.</li>
      </ul>
      <h3>B. Customization & Compliance</h3>
      <ul>
        <li><strong>Managed:</strong> Restricted access to control plane internals and master node-level tuning.</li>
        <li><strong>Self-Managed:</strong> Better for air-gapped setups, strict data sovereignty, and specialized hardware/kernel requirements.</li>
      </ul>
      <h3>C. Cost Realities: License Fees vs. Engineering Overhead</h3>
      <ul>
        <li><strong>Managed cost model:</strong> Often around <strong>$0.10/hour (~$73/month)</strong> control plane fee plus worker/resource usage.</li>
        <li><strong>Self-managed cost model:</strong> Avoids vendor control plane fee, but still needs dedicated HA control plane capacity and operational staff.</li>
      </ul>
      <p><strong>Hidden self-managed cost:</strong> 24/7 SRE on-call for <code>etcd</code>, control plane incidents, and network/plugin issues often outweighs managed control plane pricing for most teams.</p>
      <h2>4. Decision Matrix: Which Should You Choose?</h2>
      <h3>Choose Managed Kubernetes if:</h3>
      <ol>
        <li>Your product focus is application delivery, not infrastructure internals.</li>
        <li>Your platform team is small (for example 1-5 engineers) and needs scale efficiency.</li>
        <li>You want tight integration with cloud IAM, LB, storage, and managed services.</li>
      </ol>
      <h3>Choose Self-Managed Kubernetes if:</h3>
      <ol>
        <li>You operate on-prem or air-gapped environments with compliance constraints.</li>
        <li>You require ultra-specialized performance/hardware behavior.</li>
        <li>You have an experienced Kubernetes SRE team for lifecycle operations and DR.</li>
      </ol>
      <h2>Summary</h2>
      <p>For most engineering organizations, <strong>Managed Kubernetes is the pragmatic default</strong>. It lowers operational burden, improves reliability of the control plane, and lets teams focus on developer productivity and product delivery.</p>
      <p><strong>Self-Managed Kubernetes</strong> is best reserved for scenarios where regulatory boundaries, infrastructure constraints, or hardware-level customization make managed cloud offerings unsuitable.</p>
    `
  },
  {
    id: "kubernetes-capacity-planning",
    title: "Kubernetes Capacity Planning for Production Clusters",
    date: "2026-10-15",
    category: "Kubernetes",
    excerpt: "A practical guide to resource requests/limits, autoscaling strategy, and right-sizing workloads in production.",
    content: `
      <h2>Why Capacity Planning Matters</h2>
      <p>Most outages in Kubernetes are not from cluster failure—they come from poor workload sizing, noisy neighbors, and delayed scaling. Capacity planning is the discipline of matching business traffic patterns with the right compute and memory profile ahead of time.</p>
      <p>When done properly, it improves three things at once: reliability (fewer OOMKills and throttling events), performance consistency (stable latency under load), and cost efficiency (less idle overprovisioning).</p>
      <h2>Start with Resource Baselines</h2>
      <p>Collect 2-4 weeks of usage data by service. Set CPU and memory <code>requests</code> around the 50th-70th percentile for steady-state traffic and use horizontal scaling to handle spikes. Set <code>limits</code> only where guardrails are needed; very tight CPU limits can increase tail latency due to throttling.</p>
      <p>For memory-sensitive apps, start with conservative memory limits and run controlled load tests to validate GC behavior, cache pressure, and startup spikes.</p>
      <h2>Autoscaling Strategy</h2>
      <p>Use HPA for pod-level scaling and Cluster Autoscaler for node-level elasticity. CPU-only scaling is often insufficient; include custom metrics like request rate or queue depth for better signal quality.</p>
      <p>Target SLOs, not raw utilization. Example: if p95 latency crosses threshold for 5 minutes, scale out before users feel degradation. Always define scale-up and scale-down stabilization windows to avoid flapping.</p>
      <h2>Node Pool Design</h2>
      <p>Separate workloads by behavior. Keep stateless APIs, data processors, and system add-ons in dedicated node pools with taints/tolerations and affinity rules. This reduces noisy-neighbor issues and gives cleaner cost controls for each workload class.</p>
      <h2>Validation Checklist</h2>
      <p>Before calling your platform production-ready, verify: no critical pods get evicted during node churn, pod startup time fits scaling windows, and dashboards clearly correlate saturation with user-facing latency and error rates.</p>
    `
  },
  {
    id: "aws-well-architected-saa",
    title: "AWS Well-Architected Essentials for SAA Aspirants",
    date: "2026-09-28",
    category: "AWS",
    excerpt: "Learn the most important Well-Architected pillars every Solutions Architect Associate learner should master.",
    content: `
      <h2>Think Beyond Exam Dumps</h2>
      <p>The Solutions Architect Associate exam tests judgment, not memorization. Most questions describe constraints—budget, compliance, scale, RTO/RPO—and expect you to pick the best trade-off.</p>
      <p>A strong preparation strategy is to evaluate every design through Well-Architected principles and explain why alternatives are weaker.</p>
      <h2>Pillars to Prioritize</h2>
      <p><strong>Reliability:</strong> multi-AZ patterns, graceful failover, backup/restore plans, and immutable infrastructure updates.</p>
      <p><strong>Security:</strong> least-privilege IAM, encryption in transit/at rest, secrets management, and auditability with CloudTrail.</p>
      <p><strong>Cost Optimization:</strong> right-sizing, storage tiering, managed services, and usage-based elasticity.</p>
      <p><strong>Performance Efficiency:</strong> selecting compute and database options based on workload profile, not habit.</p>
      <h2>Hands-On Wins</h2>
      <p>Build one practical reference project: a 3-tier app on AWS with ALB, Auto Scaling, RDS Multi-AZ, and CloudWatch alarms. Add IAM roles with least privilege and an S3 backup lifecycle policy.</p>
      <p>Then practice failure drills: simulate an instance loss, rotate credentials, and test backup restore. These exercises make scenario-based exam questions much easier.</p>
      <h2>Common Mistakes to Avoid</h2>
      <p>Avoid single points of failure, overusing public subnets, and ignoring operational burden. In many cases, choosing a managed service (RDS, ECS Fargate, Lambda) is better than maintaining EC2-heavy custom stacks.</p>
      <h2>Revision Method</h2>
      <p>Create a one-page architecture decision sheet for each major service category (compute, storage, database, networking, security). Focus on when to use each option and why.</p>
    `
  },
  {
    id: "gitlab-cicd-kubernetes",
    title: "Building a GitLab CI/CD Pipeline for Kubernetes Deployments",
    date: "2026-09-12",
    category: "CI/CD",
    excerpt: "Design a secure, repeatable pipeline to build, scan, test, and deploy workloads to Kubernetes with confidence.",
    content: `
      <h2>Pipeline Stages That Matter</h2>
      <p>A clean production pipeline should be deterministic and auditable. A practical stage sequence is: <code>lint</code> → <code>unit-test</code> → <code>build-image</code> → <code>security-scan</code> → <code>integration-test</code> → <code>deploy-staging</code> → <code>promote-production</code>.</p>
      <p>Use merge request rules to enforce mandatory checks and prevent unreviewed code from reaching deployment branches.</p>
      <h2>Security as a Gate</h2>
      <p>Treat security findings as release criteria, not post-release tasks. Add container image scanning, dependency scanning, and policy validation (for example, disallowing privileged pods or latest tags).</p>
      <p>Set severity thresholds clearly. Example: block release on critical/high vulnerabilities unless an approved exception is attached to the pipeline record.</p>
      <h2>Progressive Delivery</h2>
      <p>Use canary or blue/green rollout strategies instead of full-cutover deployments. Promotion should depend on live service health signals such as error budget burn rate, p95 latency, and saturation.</p>
      <h2>Kubernetes Deployment Hygiene</h2>
      <p>Template manifests with environment-specific values and keep secrets outside source control. Validate manifests before apply, and always run a dry-run and policy check stage.</p>
      <p>Include deployment annotations for commit SHA, build number, and change request ID to simplify incident rollback and audit tracing.</p>
      <h2>Operational Feedback Loop</h2>
      <p>After deployment, feed runtime metrics back into the development cycle. If a change consistently increases startup time or memory pressure, make it visible in sprint reviews and adjust engineering standards.</p>
    `
  }
];

const COURSE_DETAILS = [
  {
    id: "cka",
    title: "Certified Kubernetes Administrator (CKA)",
    category: "Kubernetes Certification",
    overview: "This course is designed to take students from core container concepts to mastering Kubernetes cluster administration and passing the official Linux Foundation CKA exam. The curriculum is heavily hands-on, aligned to terminal-driven exam patterns, and focused on real production-grade cluster operations.",
    targetAudience: "System Administrators, DevOps Engineers, Software Engineers, and Infrastructure Engineers looking to specialize in container orchestration.",
    prerequisites: "Basic Linux CLI proficiency and fundamental networking knowledge (IPs, ports, and subnets).",
    format: "Live interactive coding/terminal sessions, real-world troubleshooting drills, and hands-on lab environments using Killercoda.",
    modules: [
      "Container Fundamentals & Architecture",
      "Cluster Architecture, Installation & Configuration",
      "Workloads & Scheduling",
      "Services & Networking",
      "Storage Management",
      "Troubleshooting & Maintenance"
    ]
  },
  {
    id: "aws-saa",
    title: "AWS Certified Solutions Architect – Associate (SAA-C03)",
    category: "AWS Certification",
    overview: "A complete blueprint for designing resilient, high-performing, secure, and cost-optimized architectures on Amazon Web Services. This course goes beyond exam preparation by applying real-world architecture patterns, multi-tier deployments, and disaster recovery strategies.",
    targetAudience: "Beginners to cloud, software developers, solutions architects, and IT operations professionals seeking an industry-standard cloud credential.",
    prerequisites: "Basic understanding of IT concepts (servers, databases, and networking). No prior AWS experience required.",
    format: "Architecture design exercises, AWS Management Console walkthroughs, AWS CLI labs, and practice exam simulations.",
    modules: [
      "Cloud Essentials & Identity Management",
      "Compute Services",
      "Networking & Content Delivery (VPC Deep-Dive)",
      "Storage Solutions",
      "Database & Caching Services",
      "High Availability, Auto Scaling & Messaging",
      "Design for Security, Reliability & Cost Optimization"
    ]
  },
  {
    id: "cloud-native-specialist",
    title: "Cloud Native Specialist (CKA, GitLab CI/CD Security & Observability)",
    category: "Cloud Native / DevSecOps",
    overview: "An advanced, production-oriented program designed to transform engineers into senior cloud-native practitioners. It bridges Kubernetes administration with enterprise DevSecOps workflows using GitLab pipelines, container security scanning, and full-stack observability.",
    targetAudience: "DevOps Engineers, Platform Engineers, Systems Engineers, and CKA/CKAD holders aiming to master enterprise DevSecOps and telemetry.",
    prerequisites: "Strong Linux CLI skills, basic Docker knowledge, and familiarity with YAML syntax.",
    format: "End-to-end project-based learning that builds an enterprise CI/CD flow from code commit to Kubernetes deployment with active monitoring.",
    fresherNote: "Freshers are welcome. We start from fundamentals and then progressively move to advanced implementation.",
    modules: [
      "Part 1: Kubernetes Core & Administration (CKA Engine)",
      "Part 2: Advanced GitLab CI/CD & DevSecOps",
      "Part 3: Cloud Native Observability Stack",
      "Capstone Project"
    ]
  },
  {
    id: "cloud-engineering-terraform",
    title: "Cloud Engineering (AWS CloudOps with Terraform)",
    category: "CloudOps / Infrastructure as Code",
    overview: "A hands-on engineering program focused on automated infrastructure management. Students learn to treat AWS infrastructure as code using Terraform while applying software engineering practices such as Git workflows, modularization, state strategy, and CI/CD automation.",
    targetAudience: "Cloud Engineers, Infrastructure Engineers, DevOps Engineers, and System Administrators replacing manual cloud operations with Infrastructure as Code.",
    prerequisites: "Basic AWS knowledge (VPC, EC2, IAM) and familiarity with terminal commands.",
    format: "Code-along labs, building modular Terraform codebases, and automating deployments via delivery pipelines.",
    fresherNote: "Freshers are welcome. Basics are covered first before moving into advanced CloudOps and Terraform patterns.",
    modules: [
      "Foundations of Infrastructure as Code (IaC) & Terraform",
      "Terraform State Management & Collaboration",
      "Advanced HCL & Modularization",
      "Provisioning AWS Core Infrastructure with Terraform",
      "AWS CloudOps & Day-2 Operations Automation",
      "GitOps & Pipeline Integration for IaC"
    ]
  }
];

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}

function blogCardTemplate(post) {
  const href = post.url ? post.url : `blog-post.html?id=${post.id}`;
  return `
    <article class="blog-card">
      <p class="blog-meta">${formatDate(post.date)} • ${post.category}</p>
      <h3>${post.title}</h3>
      <p>${post.excerpt}</p>
      <a class="text-link" href="${href}">Read article →</a>
    </article>
  `;
}

function authorBlockTemplate() {
  return `
    <div class="author-block">
      <p class="author-name">Author: Vivek Sabhanayakam</p>
      <p class="author-link">LinkedIn: <a class="text-link" href="https://www.linkedin.com/in/vivekanandhan-sabhanayakam-11320720/" target="_blank" rel="noopener noreferrer">vivekanandhan-sabhanayakam-11320720</a></p>
    </div>
  `;
}

function renderBlogList(containerId, limit) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  const posts = typeof limit === "number" ? BLOG_POSTS.slice(0, limit) : BLOG_POSTS;
  container.innerHTML = posts.map(blogCardTemplate).join("");
}

function renderPost() {
  const postContainer = document.getElementById("blog-post-content");
  if (!postContainer) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const post = BLOG_POSTS.find((item) => item.id === id);

  if (!post) {
    postContainer.innerHTML = `
      <h1>Post not found</h1>
      <p class="blog-meta">The requested blog article does not exist.</p>
    `;
    return;
  }

  document.title = `${post.title} | AI Platforms Technologies`;

  postContainer.innerHTML = `
    <h1>${post.title}</h1>
    <p class="blog-meta">${formatDate(post.date)} • ${post.category}</p>
    <div class="blog-post-content">${post.content}</div>
    ${authorBlockTemplate()}
  `;
}

function renderCourseDetails() {
  const courseContainer = document.getElementById("course-details-content");
  if (!courseContainer) {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const course = COURSE_DETAILS.find((item) => item.id === id);

  if (!course) {
    courseContainer.innerHTML = `
      <h1>Course not found</h1>
      <p class="blog-meta">The requested course details page does not exist.</p>
    `;
    return;
  }

  document.title = `${course.title} | AI Platforms Technologies`;

  const moduleItems = course.modules.map((moduleName) => `<li>${moduleName}</li>`).join("");
  const fresherSection = course.fresherNote
    ? `<h3>Freshers</h3><p>${course.fresherNote}</p>`
    : "";

  courseContainer.innerHTML = `
    <h1>${course.title}</h1>
    <p class="blog-meta">${course.category}</p>
    <div class="blog-post-content">
      <h2>Course Overview</h2>
      <p>${course.overview}</p>
      <h3>Target Audience</h3>
      <p>${course.targetAudience}</p>
      <h3>Prerequisites</h3>
      <p>${course.prerequisites}</p>
      <h3>Format</h3>
      <p>${course.format}</p>
      ${fresherSection}
      <h2>Core Modules & Learning Objectives</h2>
      <ul>
        ${moduleItems}
      </ul>
    </div>
  `;
}

function updateYear() {
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

renderBlogList("home-blog-list", 3);
renderBlogList("blog-list");
renderPost();
renderCourseDetails();
updateYear();
