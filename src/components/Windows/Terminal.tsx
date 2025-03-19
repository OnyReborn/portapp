import React, { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  initialContent?: string;
}

const Terminal: React.FC<TerminalProps> = ({ initialContent = '' }) => {
  const [history, setHistory] = useState<string[]>([
    'Welcome to Portfolio Terminal',
    'Type "help" for available commands',
    '',
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: () =>
      'Available commands:\n' +
      '  help - Show this help message\n' +
      '  clear - Clear the terminal\n' +
      '  about - About the portfolio author\n' +
      '  skills - List programming skills\n' +
      '  projects - List notable projects\n' +
      '  contact - Show contact information\n' +
      '  ls - List files in current directory\n' +
      '  cat <file> - Display file contents',
    clear: () => {
      setHistory([]);
      return '';
    },
    about: () =>
      'Hi there! I\'m a passionate frontend developer specializing in building\n' +
      'interactive web applications with modern technologies like React,\n' +
      'TypeScript, and TailwindCSS. I love creating intuitive and engaging\n' +
      'user experiences and constantly exploring new web technologies.',
    skills: () =>
      'Technical Skills:\n' +
      '  - Frontend: React, Vue, Angular, JavaScript/TypeScript\n' +
      '  - Styling: CSS, SASS, TailwindCSS, Styled Components\n' +
      '  - Backend: Node.js, Express, Django\n' +
      '  - Databases: MongoDB, PostgreSQL, MySQL\n' +
      '  - Tools: Git, Docker, Webpack, Vite',
    projects: () =>
      'Notable Projects:\n' +
      '  1. E-commerce Platform - React/Node.js/MongoDB\n' +
      '  2. Weather Dashboard - React/TypeScript\n' +
      '  3. Task Management App - Vue/Firebase\n\n' +
      'Type "cat Projects/project-1.txt" to learn more about specific projects.',
    contact: () =>
      'Get in touch:\n' +
      '  - Email: contact@myportfolio.com\n' +
      '  - LinkedIn: linkedin.com/in/myportfolio\n' +
      '  - GitHub: github.com/myportfolio\n' +
      '  - Twitter: @myportfolio',
    ls: () =>
      'Information/\n' +
      'Blog/\n' +
      'Projects/\n' +
      'README',
    cat: (args: string[]) => {
      if (!args[0]) {
        return 'Error: Please specify a file to read';
      }

      // Basic virtual file system
      const files: Record<string, string> = {
        'README': 'Welcome to my portfolio! This interactive macOS-inspired website showcases my skills and projects.',
        'Information/info.txt': 'Personal information and professional background details.',
        'Projects/project-1.txt': 'E-commerce Platform: A full-featured online shopping platform built with the MERN stack.',
        'Projects/project-2.txt': 'Weather Dashboard: An interactive weather forecast application with data visualization.',
        'Projects/project-3.txt': 'Task Management App: A Trello-like kanban board for task organization.',
        'Blog/blog-1.txt': 'Why React is Awesome: Thoughts on building UIs with React.',
        'Blog/blog-2.txt': 'CSS Grid vs Flexbox: When to use each layout method.',
        'Blog/blog-3.txt': 'TypeScript Tips: Improving code quality with TypeScript.',
        'Blog/blog-4.txt': 'Web Performance: Techniques for optimizing web applications.',
      };

      if (files[args[0]]) {
        return files[args[0]];
      } else {
        return `Error: File "${args[0]}" not found`;
      }
    },
    '': () => '',
  };

  // Auto-scroll to bottom when new commands are entered
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add command to history
    const newHistory = [...history, `$ ${currentInput}`];

    // Process command
    const [cmd, ...args] = currentInput.trim().split(' ');

    // Execute command if it exists
    if (cmd in commands) {
      const result = (commands as any)[cmd](args);
      if (result !== '') {
        newHistory.push(result);
      }
    } else if (cmd) {
      newHistory.push(`Command not found: ${cmd}`);
    }

    setHistory(newHistory);
    setCurrentInput('');
  };

  return (
    <div className="terminal h-full" ref={terminalRef}>
      {history.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap">
          {line}
        </div>
      ))}
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="mr-2">$</span>
        <input
          type="text"
          value={currentInput}
          onChange={handleInputChange}
          className="flex-1 bg-transparent outline-none text-green-400"
          autoFocus
        />
      </form>
    </div>
  );
};

export default Terminal;
