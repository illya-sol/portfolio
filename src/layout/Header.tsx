import Script from 'next/script';

import { Meta } from './Meta';

const Header = () => (
  <>
    <Meta
      title="Illya Solodky - Artistic Web Developer"
      description="Next js Boilerplate is the perfect starter code for your project. Build your React application with the Next.js framework."
    />
    <div className="flex justify-center mt-16 text-4xl text-dark-third">
      head
    </div>
    {/* ThreeJS shaders */}
    <Script
      src="..\threejs\shaders\vertexShader.glsl"
      type="x-shader/x-vertex"
    />
    <Script
      src="..\threejs\shaders\fragmentShader.glsl"
      type="x-shader/x-fragment"
    />
  </>
);

export default Header;
