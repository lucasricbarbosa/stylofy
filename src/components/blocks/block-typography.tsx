export function BlockTypography() {
  return (
    <div className="w-full py-16 px-2 bg-background">
      <div className="max-w-3xl mx-auto space-y-16">
        {/* Display & Headings */}
        <section className="space-y-8">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Display &amp; Headings
          </h2>

          <div className="space-y-6">
            <div className="space-y-1">
              <div className="flex items-baseline gap-4">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground text-balance">
                  The quick brown fox jumps over the lazy dog
                </h1>
              </div>
              <p className="text-xs font-mono text-muted-foreground">
                h1 · text-5xl md:text-6xl font-bold tracking-tight
              </p>
            </div>

            <div className="space-y-1">
              <h2 className="text-4xl font-semibold tracking-tight text-foreground">
                A heading that introduces a section
              </h2>
              <p className="text-xs font-mono text-muted-foreground">
                h2 · text-4xl font-semibold tracking-tight
              </p>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-semibold text-foreground">
                A smaller subsection
              </h3>
              <p className="text-xs font-mono text-muted-foreground">
                h3 · text-2xl font-semibold
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="text-xl font-semibold text-foreground">
                A minor heading
              </h4>
              <p className="text-xs font-mono text-muted-foreground">
                h4 · text-xl font-semibold
              </p>
            </div>
          </div>
        </section>

        {/* Body Text */}
        <section className="space-y-8">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Body Text
          </h2>

          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-xl text-muted-foreground text-pretty">
                This is a lead paragraph. It uses larger text to introduce
                content and capture the reader&apos;s attention before diving
                into the details below.
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                Lead · text-xl text-muted-foreground
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-base leading-7 text-foreground">
                This is standard body text using the default foreground color.
                It maintains excellent readability at normal paragraph lengths
                and works well for long-form content. The line height is
                carefully tuned to provide comfortable reading.
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                Body · text-base leading-7 text-foreground
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                This is small text, useful for captions, footnotes, and
                secondary information that shouldn&apos;t compete with the main
                content.
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                Small · text-sm text-muted-foreground
              </p>
            </div>
          </div>
        </section>

        {/* Font Weights */}
        <section className="space-y-8">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Font Weights
          </h2>

          <div className="flex flex-wrap gap-8">
            <div className="space-y-1">
              <p className="text-lg font-light text-foreground">
                The quick brown fox
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                font-light
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-normal text-foreground">
                The quick brown fox
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                font-normal
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-medium text-foreground">
                The quick brown fox
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                font-medium
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-semibold text-foreground">
                The quick brown fox
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                font-semibold
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-lg font-bold text-foreground">
                The quick brown fox
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                font-bold
              </p>
            </div>
          </div>
        </section>

        {/* Color Tokens Applied to Text */}
        <section className="space-y-8">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Color Tokens Applied to Text
          </h2>

          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-foreground">Default foreground text</p>
              <p className="text-xs font-mono text-muted-foreground">
                text-foreground
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">
                Muted, for secondary information
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                text-muted-foreground
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-primary">Primary, for emphasis and links</p>
              <p className="text-xs font-mono text-muted-foreground">
                text-primary
              </p>
            </div>

            <div className="space-y-1">
              <span className="inline-block bg-secondary text-secondary-foreground px-3 py-1 rounded-md">
                Secondary foreground text
              </span>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                bg-secondary text-secondary-foreground
              </p>
            </div>

            <div className="space-y-1">
              <span className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-md">
                Accent foreground text
              </span>
              <p className="text-xs font-mono text-muted-foreground mt-1">
                bg-accent text-accent-foreground
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-destructive">
                Destructive, for errors and warnings
              </p>
              <p className="text-xs font-mono text-muted-foreground">
                text-destructive
              </p>
            </div>
          </div>
        </section>

        {/* Inline Elements */}
        <section className="space-y-8">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Inline Elements
          </h2>

          <div className="space-y-2">
            <p className="text-base leading-7 text-foreground">
              This paragraph contains{" "}
              <a href="#" className="text-primary underline underline-offset-4">
                a styled link
              </a>
              , some{" "}
              <code className="bg-muted text-foreground px-1.5 py-0.5 rounded font-mono text-sm">
                inline code
              </code>
              , <strong>bold text for emphasis</strong>, and{" "}
              <em>italicized text for nuance</em>. All these elements work
              together harmoniously.
            </p>
            <p className="text-xs font-mono text-muted-foreground">
              Mix of a, code, strong, and em elements
            </p>
          </div>
        </section>

        {/* Blockquote */}
        <section className="space-y-8">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Blockquote
          </h2>

          <div className="space-y-2">
            <blockquote className="border-l-4 border-border pl-6 py-2 text-muted-foreground italic">
              Design is not just what it looks like and feels like. Design is
              how it works. The details are not the details. They make the
              design.
            </blockquote>
            <p className="text-xs font-mono text-muted-foreground">
              blockquote · border-l-4 border-border text-muted-foreground italic
            </p>
          </div>
        </section>

        {/* List */}
        <section className="space-y-8">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            List
          </h2>

          <div className="space-y-2">
            <ul className="list-disc list-inside space-y-2 text-foreground">
              <li>First item in the list with standard styling</li>
              <li>Second item showing proper spacing between elements</li>
              <li>Third item demonstrating consistent list formatting</li>
            </ul>
            <p className="text-xs font-mono text-muted-foreground">
              ul · list-disc list-inside space-y-2
            </p>
          </div>
        </section>

        {/* Code Block */}
        <section className="space-y-8">
          <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2">
            Code Block
          </h2>

          <div className="space-y-2">
            <pre className="bg-muted text-foreground border border-border p-4 rounded-lg overflow-x-auto">
              <code className="font-mono text-sm">{`function greet(name: string) {
  console.log(\`Hello, \${name}!\`);
  return { success: true };
}

greet("World");`}</code>
            </pre>
            <p className="text-xs font-mono text-muted-foreground">
              pre/code · bg-muted text-foreground border-border font-mono
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
