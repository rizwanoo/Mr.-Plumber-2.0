import heroCopperImg from '../assets/images/hero_copper_craftsmanship_1794751636653.jpg';
import pexManifoldImg from '../assets/images/pex_manifold_installation_1794751637566.jpg';
import cpvcPvcImg from '../assets/images/cpvc_pvc_piping_1794751638495.jpg';
import castIronAbsImg from '../assets/images/cast_iron_abs_drainage_1794751638393.jpg';
import toolsVirginiaImg from '../assets/images/plumbing_tools_charlottesville_1794751639482.jpg';

export type PageRoute = 'home' | 'services' | 'work-about' | 'contact';

export interface PlumbingMaterial {
  id: string;
  index: string;
  name: string;
  shortLabel: string;
  category: string;
  headline: string;
  summary: string;
  details: string;
  applications: string[];
  bgColor: string;
  textColor: string;
  accentColor: string;
  image: string;
  imageAlt: string;
  imageNote: string;
}

export const BUSINESS_INFO = {
  brandName: 'Mr. Plumber 2.0',
  specialty: 'Plomería / Plumbing',
  email: 'denistoribio55@gmail.com',
  facebookUrl: 'https://www.facebook.com/Mr.Plumber2.0',
  location: 'Charlottesville, Virginia',
  // Configurable fields — intentionally null until verified directly with the business owner
  phone: null as string | null,
  workingHours: null as string | null,
  streetAddress: null as string | null,
  logoCutout: '/assets/logo/mr-plumber-logo-cutout.png',
  logoOriginal: '/assets/logo/mr-plumber-logo.png',
};

export const SITE_IMAGES = {
  heroCopper: heroCopperImg,
  pexManifold: pexManifoldImg,
  cpvcPvc: cpvcPvcImg,
  castIronAbs: castIronAbsImg,
  toolsVirginia: toolsVirginiaImg,
};

export const VERIFIED_MATERIALS: PlumbingMaterial[] = [
  {
    id: 'cpvc',
    index: '01',
    name: 'CPVC Piping Systems',
    shortLabel: 'CPVC',
    category: 'Hot & Cold Potable Water',
    headline: 'Chlorinated Polyvinyl Chloride built for heat and pressure.',
    summary:
      'A rigid, corrosion-resistant thermoplastic pipe trusted across residential hot and cold water distribution.',
    details:
      'CPVC withstands higher temperatures than standard PVC while remaining impervious to mineral scaling and pinhole corrosion. Proper solvent-cement curing, thermal expansion clearance, and aligned hanger spacing keep lines quiet and dependable.',
    applications: [
      'Hot and cold potable water supply branches',
      'Transitions from legacy supply lines using approved adapters',
      'Interior residential distribution lines requiring heat tolerance',
    ],
    bgColor: '#FFFFFF',
    textColor: '#34414A',
    accentColor: '#1769E8',
    image: cpvcPvcImg,
    imageAlt: 'Cream CPVC hot and cold water piping aligned beside white Schedule 40 PVC drainage runs',
    imageNote: 'Editorial reference visual — CPVC & PVC system alignment',
  },
  {
    id: 'cast-iron',
    index: '02',
    name: 'Cast Iron Pipework',
    shortLabel: 'Cast Iron',
    category: 'Heavy-Duty Drain & Stack',
    headline: 'Acoustic weight and structural durability in vertical stacks.',
    summary:
      'Cast iron remains the benchmark for quiet vertical waste stacks and enduring structural drainage runs.',
    details:
      'Known for dampening water flow noise inside walls and multi-story framing, cast iron requires disciplined support brackets and heavy-duty shielded couplings wherever legacy sections meet modern drainage piping.',
    applications: [
      'Main vertical soil stacks and multi-story risers',
      'No-hub shielded coupling transitions to ABS or PVC',
      'Sound-dampened residential waste lines',
    ],
    bgColor: '#DDF1FF',
    textColor: '#34414A',
    accentColor: '#1769E8',
    image: castIronAbsImg,
    imageAlt: 'Heavy-duty black cast iron soil stack coupled cleanly to ABS drainage piping with stainless steel shielded couplings',
    imageNote: 'Editorial reference visual — Cast Iron stack & shielded coupling transition',
  },
  {
    id: 'pex',
    index: '03',
    name: 'PEX-A & PEX-B Systems',
    shortLabel: 'PEX-A & PEX-B',
    category: 'Cross-Linked Polyethylene Supply',
    headline: 'Flexible home-run manifolds and freeze-resilient supply lines.',
    summary:
      'Modern PEX-A expansion and PEX-B crimp systems minimize concealed fittings while balancing flow across fixtures.',
    details:
      'Whether utilizing flexible PEX-A with thermal memory expansion fittings or dependable PEX-B crimp rings, organized color-coded routing and dedicated shutoff manifolds make future maintenance clear and straightforward.',
    applications: [
      'Color-coded hot (red) and cold (blue) manifold distribution',
      'Clean sweeping bends that reduce elbow pressure loss',
      'Copper stub-outs and brass ball-valve shutoff assemblies',
    ],
    bgColor: '#FFF9EF',
    textColor: '#34414A',
    accentColor: '#08B9B0',
    image: pexManifoldImg,
    imageAlt: 'Color-coded red and blue PEX-A and PEX-B manifold with brass shutoff valves and pressure gauges',
    imageNote: 'Editorial reference visual — Organized PEX hot and cold manifold',
  },
  {
    id: 'copper',
    index: '04',
    name: 'Copper Pipework',
    shortLabel: 'Copper',
    category: 'Precision Metal Supply',
    headline: 'Timeless craftsmanship in clean soldered runs and brass valves.',
    summary:
      'Rigid Type L and Type M copper delivers bacteriostatic performance, crisp mechanical alignment, and decades of service.',
    details:
      'Clean copper work shows in every detail—square cuts, proper deburring, flux discipline, even sweat joints, and copper-plated straps that hold parallel horizontal and vertical runs around mechanical rooms and water heaters.',
    applications: [
      'Exposed mechanical room risers and boiler/water-heater headers',
      'Main water shutoffs with quarter-turn brass ball valves',
      'Rigid copper stub-outs and durable exterior-grade supply lines',
    ],
    bgColor: '#E8F4EC',
    textColor: '#34414A',
    accentColor: '#FF914D',
    image: heroCopperImg,
    imageAlt: 'Sunlit precision copper water supply lines with soldered brass ball valves along timber framing',
    imageNote: 'Editorial reference visual — Precision soldered copper & brass valves',
  },
  {
    id: 'pvc',
    index: '05',
    name: 'PVC Piping Systems',
    shortLabel: 'PVC',
    category: 'Drain-Waste-Vent (DWV)',
    headline: 'Consistent grade and clean solvent-welded drainage.',
    summary:
      'Schedule 40 PVC forms the clean, smooth-bore backbone of modern drain, waste, and venting architecture.',
    details:
      'Smooth interior walls resist buildup when installed with accurate slope, properly seated sanitary tees and long-sweep wyes, and cleanouts positioned where homeowners actually need access.',
    applications: [
      'Residential drain, waste, and vent (DWV) rough-in',
      'Sanitary tees, wye branches, and accessible cleanout fittings',
      'Cold-water exterior supply and condensate drainage lines',
    ],
    bgColor: '#FFFFFF',
    textColor: '#34414A',
    accentColor: '#1769E8',
    image: cpvcPvcImg,
    imageAlt: 'White Schedule 40 PVC drain-waste-vent pipes with clean sanitary fittings inside bright framing',
    imageNote: 'Editorial reference visual — Schedule 40 PVC drain-waste-vent routing',
  },
  {
    id: 'abs',
    index: '06',
    name: 'ABS Drainage Systems',
    shortLabel: 'ABS',
    category: 'Impact-Resistant DWV',
    headline: 'Rigid black thermoplastic engineered for tough drain lines.',
    summary:
      'Acrylonitrile Butadiene Styrene (ABS) offers single-step solvent joining and strong impact resilience across temperature swings.',
    details:
      'Valued for cold-weather toughness and rigid structural stability in crawlspaces and basements, ABS integrates cleanly with existing cast iron stacks via approved shielded transition couplings.',
    applications: [
      'Basement and crawlspace drain-waste-vent runs',
      'Shielded transitions tying into existing cast iron risers',
      'Impact-resilient residential drainage assemblies',
    ],
    bgColor: '#DDF1FF',
    textColor: '#34414A',
    accentColor: '#08B9B0',
    image: castIronAbsImg,
    imageAlt: 'Black ABS drainage transition connected to cast iron stack with shielded couplings',
    imageNote: 'Editorial reference visual — ABS drainage assembly and coupling',
  },
];

export const PERSONAL_INTERESTS = [
  {
    name: 'Hiking',
    note: 'Exploring Virginia trails and appreciating patience, pacing, and preparation.',
  },
  {
    name: 'Nature Photography',
    note: 'A sharp eye for detail, lighting, and honest composition.',
  },
  {
    name: 'Cooking',
    note: 'Respecting good ingredients, clean prep, and getting timing right.',
  },
  {
    name: 'Cycling',
    note: 'Steady endurance, mechanical upkeep, and forward momentum.',
  },
  {
    name: 'Plumbing',
    note: 'Not just a trade—a craft centered on systems that quietly work every day.',
  },
];
