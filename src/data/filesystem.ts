import { FileItem } from '../types';

export const fileSystem: FileItem[] = [
  {
    id: 'readme',
    name: 'README',
    type: 'text',
    content: `# Welcome to My Portfolio

Hello there! Welcome to my interactive macOS-inspired portfolio website. This site is designed to showcase my skills and projects in a unique and engaging way.

## Navigation

- Click on the desktop icons to open different applications
- Use the dock at the bottom to quickly access applications
- The menu bar at the top provides additional options

## About Me

I'm a passionate developer who loves creating interactive and visually appealing web experiences. This portfolio showcases my skills in React, TypeScript, and UI/UX design.

Feel free to explore around and check out my projects!`,
    position: { x: 20, y: 20 },
  },
  {
    id: 'information',
    name: 'Information',
    type: 'folder',
    position: { x: 20, y: 120 },
    children: [
      {
        id: 'info-txt',
        name: 'info.txt',
        type: 'text',
        content: `# About Me

## Skills
- Frontend Development: React, Vue, Angular
- Backend Development: Node.js, Express, Django
- Languages: JavaScript, TypeScript, Python, Java
- UI/UX Design: Figma, Adobe XD
- Database: MongoDB, PostgreSQL, MySQL

## Education
- Bachelor of Science in Computer Science - University of Technology
- Master of Science in Web Engineering - Digital Institute

## Experience
- Senior Frontend Developer at Tech Innovations (2020-Present)
- Web Developer at Digital Solutions Inc. (2018-2020)
- Junior Developer at StartUp Labs (2016-2018)

## Contact
- Email: contact@myportfolio.com
- LinkedIn: linkedin.com/in/myportfolio
- GitHub: github.com/myportfolio
- Twitter: @myportfolio`,
      },
    ],
  },
  {
    id: 'blog',
    name: 'Blog',
    type: 'folder',
    position: { x: 20, y: 220 },
    children: [
      {
        id: 'blog-1',
        name: 'Why React is Awesome.txt',
        type: 'text',
        content: `# Why React is Awesome

React has transformed the way we build web applications. Here are some reasons why I love using React:

1. **Component-Based Architecture**: React's component-based approach makes code reusable and maintainable.

2. **Virtual DOM**: The virtual DOM optimizes rendering performance by minimizing actual DOM updates.

3. **Rich Ecosystem**: The React ecosystem is vast, with libraries for state management, routing, styling, and more.

4. **Strong Community Support**: React has a large and active community, providing resources, tutorials, and solutions.

5. **JSX Syntax**: JSX makes it intuitive to write UI components by combining HTML-like syntax with JavaScript.

In my experience, React's flexibility and robust architecture make it suitable for projects of all sizes, from small web apps to large enterprise applications.`,
      },
      {
        id: 'blog-2',
        name: 'CSS Grid vs Flexbox.txt',
        type: 'text',
        content: `# CSS Grid vs Flexbox: When to Use What

Both CSS Grid and Flexbox are powerful layout tools, but they serve different purposes:

## Flexbox
- One-dimensional layout (either row OR column)
- Great for aligning items within a container
- Perfect for navigation bars, card layouts, and centering elements
- Focuses on content flow

## CSS Grid
- Two-dimensional layout (rows AND columns simultaneously)
- Excellent for overall page layouts
- Better for complex grid-based designs
- Focuses on both layout structure and content placement

### When to use Flexbox:
- When you need to align items in a single row or column
- For smaller component layouts
- When you need flexible elements that can grow or shrink

### When to use Grid:
- For complex, multi-dimensional layouts
- When you need precise control over rows and columns
- For overall page structure

In many modern projects, I use both technologies together: Grid for the overall layout and Flexbox for component-level alignment.`,
      },
      {
        id: 'blog-3',
        name: 'Typescript Tips.txt',
        type: 'text',
        content: `# TypeScript Tips for Better Code

TypeScript has significantly improved my development experience. Here are some tips I've learned along the way:

## 1. Use strict mode
Enable \`strict: true\` in your tsconfig.json to catch more potential issues.

## 2. Leverage utility types
TypeScript's built-in utility types like Partial<T>, Required<T>, Pick<T>, and Omit<T> can save you from writing repetitive type definitions.

## 3. Avoid 'any'
The 'any' type defeats the purpose of using TypeScript. Try using 'unknown' when the type is truly uncertain.

## 4. Create type guards
Function like: \`function isString(value: unknown): value is string { return typeof value === 'string'; }\`

## 5. Use discriminated unions
\`\`\`typescript
type Success = { status: 'success'; data: any };
type Error = { status: 'error'; error: string };
type Response = Success | Error;
\`\`\`

## 6. Don't overuse generics
While powerful, excessive use of generics can make code harder to understand.

TypeScript has made my code more robust and easier to maintain. The initial investment in writing proper types pays off tremendously during refactoring and collaboration.`,
      },
      {
        id: 'blog-4',
        name: 'Web Performance.txt',
        type: 'text',
        content: `# Web Performance Optimization Techniques

Optimizing web performance is crucial for user experience and SEO. Here are some key techniques I use:

## Loading Performance
- **Code Splitting**: Load only what's needed for the current view
- **Tree Shaking**: Eliminate dead code
- **Lazy Loading**: Defer loading of non-critical resources
- **Image Optimization**: Use WebP format, responsive images, and lazy loading

## Rendering Performance
- **Minimize DOM Manipulation**: Batch updates when possible
- **Use CSS Animations**: They're more performant than JavaScript animations for many cases
- **Debounce and Throttle**: Limit expensive calculations and API calls
- **Virtualize Long Lists**: Only render visible items in long scrollable lists

## Caching Strategy
- **Implement Service Workers**: Enable offline capabilities
- **Use HTTP Caching Headers**: Set appropriate cache-control headers
- **Cache API Responses**: Store responses to avoid unnecessary network requests

## Monitoring Tools
- Lighthouse
- WebPageTest
- Chrome DevTools Performance panel
- Core Web Vitals

Implementing these techniques has helped me achieve significant improvements in First Contentful Paint (FCP), Largest Contentful Paint (LCP), and Time to Interactive (TTI) metrics across multiple projects.`,
      },
    ],
  },
  {
    id: 'projects',
    name: 'Projects',
    type: 'folder',
    position: { x: 20, y: 320 },
    children: [
      {
        id: 'project-1',
        name: 'E-commerce Platform.txt',
        type: 'text',
        content: `# E-commerce Platform

## Description
A full-featured e-commerce platform built with React, Node.js, and MongoDB. The platform includes product browsing, cart functionality, user authentication, and payment processing.

## Key Features
- Responsive product catalog with filtering and sorting
- User account management and order history
- Real-time cart updates and checkout process
- Admin dashboard for inventory management
- Payment processing with Stripe integration
- Order tracking and notifications

## Technologies Used
- Frontend: React, Redux, Styled Components
- Backend: Node.js, Express, MongoDB
- Authentication: JWT, OAuth
- Payment: Stripe API
- Deployment: AWS

## Challenges and Solutions
One major challenge was optimizing the product catalog for performance with large datasets. I implemented virtualized lists and pagination to ensure smooth browsing even with thousands of products.

## Links
- [Live Demo](https://example.com/ecommerce)
- [GitHub Repository](https://github.com/myportfolio/ecommerce)`,
      },
      {
        id: 'project-2',
        name: 'Weather Dashboard.txt',
        type: 'text',
        content: `# Weather Dashboard Application

## Description
An interactive weather dashboard that provides current weather conditions and forecasts for multiple locations. Users can save favorite locations and view historical weather data.

## Key Features
- Current weather conditions with visual indicators
- 5-day forecast with hourly breakdowns
- Location search with autocomplete
- Saved locations with quick access
- Weather maps with various layers (precipitation, temperature, wind)
- Historical weather data charts

## Technologies Used
- React with TypeScript
- Chart.js for data visualization
- OpenWeatherMap and WeatherAPI
- Geolocation API
- Local Storage for saving preferences
- Progressive Web App (PWA) features

## Implementation Details
The application uses a custom hook system to manage API requests and caching. Weather data is cached locally to reduce API calls and improve performance. The UI adapts to different weather conditions, changing colors and icons based on the current weather.

## Links
- [Live Demo](https://example.com/weather)
- [GitHub Repository](https://github.com/myportfolio/weather-dashboard)`,
      },
      {
        id: 'project-3',
        name: 'Task Management App.txt',
        type: 'text',
        content: `# Task Management Application

## Description
A collaborative task management application inspired by Trello and Asana. It features a kanban board interface, task assignments, due dates, and team collaboration tools.

## Key Features
- Drag-and-drop kanban board interface
- Task creation with rich text formatting
- Task assignments, labels, and due dates
- Comment system for team collaboration
- File attachments and task history
- Email notifications for task updates

## Technologies Used
- Vue.js 3 with Composition API
- Pinia for state management
- Firebase for backend and authentication
- Firestore for real-time database
- Drag-and-drop: Vue Draggable
- Rich text editor: TipTap

## Development Process
This project followed an agile methodology with two-week sprints. I started with a minimal viable product focused on the core kanban functionality, then iteratively added features based on user feedback.

The most challenging aspect was implementing real-time updates when multiple users interact with the same board. I solved this using Firestore's real-time capabilities and a custom conflict resolution strategy.

## Links
- [Live Demo](https://example.com/taskapp)
- [GitHub Repository](https://github.com/myportfolio/task-app)`,
      },
    ],
  },
];

export default fileSystem;
