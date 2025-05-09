export type Agent = {
  id: string;
  agentId: string;
  name: string;
  email: string;
  mobile: string;
  nric: string;
  dob: string;
  accountNumber: string;
  bankName: string;
  region?: string;
  status: string;
  gender?: string;
  branch?: string;
  joinDate?: string;
  address?: string;
  kwspNumber?: string;
  taxId?: string;
  sponsor?: string;
  commissionTier?: string;
  ytdSales?: number;
  ytdCommission?: number;
  lastPayout?: number;
  lastPayoutDate?: string;
  nextPaymentDate?: string;
  trainingModules?: { name: string; completed: boolean; date: string }[];
  performance?: { month: string; sales: number; target: number }[];
  documents?: { name: string; type: string; url: string }[];
};

// Helper function to generate a random date between two dates
const randomDate = (start: Date, end: Date): string => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toISOString().split('T')[0];
};

// Helper function to generate a random NRIC
const generateNRIC = (): string => {
  const year = Math.floor(Math.random() * 30 + 70).toString().padStart(2, '0');
  const month = Math.floor(Math.random() * 12 + 1).toString().padStart(2, '0');
  const day = Math.floor(Math.random() * 28 + 1).toString().padStart(2, '0');
  const randomNums = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `${year}${month}${day}${randomNums}`;
};

// Helper function to generate a random Malaysian mobile number
const generateMobile = (): string => {
  const prefixes = ['6011', '6012', '6013', '6014', '6016', '6017', '6018', '6019'];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const numbers = Math.floor(Math.random() * 10000000).toString().padStart(7, '0');
  return `${prefix}${numbers}`;
};

// Helper function to generate random training modules
const generateTrainingModules = (): { name: string; completed: boolean; date: string }[] => {
  const modules = ['Product Knowledge', 'Sales Techniques', 'Compliance Training', 'Digital Marketing', 'Customer Service', 'System Training'];
  const count = Math.floor(Math.random() * 4) + 1; // 1 to 4 completed modules
  const result = [];
  
  for (let i = 0; i < modules.length; i++) {
    const completed = i < count;
    result.push({
      name: modules[i],
      completed,
      date: completed ? randomDate(new Date(2024, 0, 1), new Date()) : ''
    });
  }
  
  return result;
};

// Helper function to generate random performance data
const generatePerformance = (): { month: string; sales: number; target: number }[] => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();
  const result = [];
  
  for (let i = Math.max(0, currentMonth - 5); i <= currentMonth; i++) {
    const target = Math.floor(Math.random() * 20000) + 10000;
    const performance = Math.random();
    const sales = Math.floor(target * (performance * 0.7 + 0.6)); // Sales between 60% and 130% of target
    
    result.push({
      month: months[i],
      sales,
      target
    });
  }
  
  return result;
};

// Helper function to generate list of agents
const generateAgents = (count: number): Agent[] => {
  const firstNames = ['Ahmad', 'Siti', 'Michael', 'David', 'Nurul', 'Lee', 'Raj', 'Kavita', 'Tan', 'Wong', 'Lily', 'Hassan', 'Fatimah', 'Chong', 'Kumar', 'Mei Ling', 'Jason', 'Wei Chen', 'Aisha', 'Surinder'];
  const lastNames = ['Bin Abdullah', 'Binti Mohammed', 'Tan', 'Kumar', 'Lee', 'Wong', 'Singh', 'bin Ibrahim', 'Lim', 'Patel', 'Chen', 'bin Musa', 'Kaur', 'Binti Ahmad', 'Rai', 'Chong', 'Jun Wei', 'Binti Hassan', 'bin Ishak', 'Samy'];
  const regions = ['Kuala Lumpur', 'Penang', 'Johor', 'Selangor', 'Sabah', 'Sarawak', 'Melaka', 'Pahang', 'Perak', 'Kedah', 'Kelantan', 'Terengganu', 'Negeri Sembilan'];
  const banks = ['Maybank', 'CIMB', 'Public Bank', 'RHB', 'Hong Leong', 'AmBank', 'Bank Islam', 'OCBC', 'HSBC', 'Bank Rakyat'];
  const sponsors = ['Sarah Lee', 'Michael Tan', 'Ahmad Ibrahim', 'Lisa Wong', 'Raj Kumar', 'Tan Wei Ling', 'Nurul Ahmad', 'David Chen', 'Kavita Singh', 'Wong Jun Wei'];
  const commissionTiers = ['Tier 1', 'Tier 2', 'Tier 3', 'Tier 1', 'Tier 2', 'Tier 1'];
  const statuses = ['active', 'pending', 'rejected', 'active', 'active', 'active', 'pending', 'pending', 'active', 'active'];
  const genders = ['M', 'F'];
  
  const agents = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}${Math.floor(Math.random() * 1000)}@example.com`;
    const region = regions[Math.floor(Math.random() * regions.length)];
    const bank = banks[Math.floor(Math.random() * banks.length)];
    const sponsor = sponsors[Math.floor(Math.random() * sponsors.length)];
    const tier = commissionTiers[Math.floor(Math.random() * commissionTiers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const dob = randomDate(new Date(1970, 0, 1), new Date(2000, 0, 1));
    const joinDate = randomDate(new Date(2023, 0, 1), new Date());
    const ytdSales = Math.floor(Math.random() * 200000) + 20000;
    const commissionRate = tier === 'Tier 1' ? 0.1 : tier === 'Tier 2' ? 0.08 : 0.06;
    const ytdCommission = Math.floor(ytdSales * commissionRate);
    const lastPayout = Math.floor(Math.random() * 5000) + 1000;
    const lastPayoutDate = status === 'active' ? '2025-04-15' : '';
    const nric = generateNRIC();
    const mobile = generateMobile();
    const gender = genders[Math.floor(Math.random() * genders.length)];
    
    agents.push({
      id: (i + 6).toString(), // Start after the existing 5 agents
      name: fullName,
      mobile,
      email,
      status: status as 'active' | 'pending' | 'rejected',
      joinDate,
      region,
      nric,
      dob,
      address: `${Math.floor(Math.random() * 100) + 1} Jalan ${Math.floor(Math.random() * 100) + 1}, ${region}`,
      bankName: bank,
      accountNumber: Math.floor(Math.random() * 10000000000).toString(),
      kwspNumber: `KWSP${Math.floor(Math.random() * 1000000).toString()}`,
      taxId: `TAX${Math.floor(Math.random() * 1000000).toString()}`,
      agentId: `EON${(i + 6).toString().padStart(3, '0')}`,
      sponsor,
      commissionTier: tier,
      ytdSales,
      ytdCommission,
      lastPayout,
      lastPayoutDate,
      nextPaymentDate: status === 'active' ? '2025-05-15' : '',
      trainingModules: generateTrainingModules(),
      performance: generatePerformance(),
      documents: [
        { name: 'NRIC', type: 'pdf', url: '#' },
        { name: 'NDA', type: 'pdf', url: '#' },
        { name: status === 'active' ? 'Agreement' : 'Application', type: 'pdf', url: '#' }
      ],
      gender,
      branch: Math.random() > 0.5 ? 'Branch A' : 'Branch B'
    });
  }
  
  return agents;
};

// Helper function to generate commission payout data
const generateCommissionPayouts = (count: number) => {
  const tiers = ['Tier 1', 'Tier 2', 'Tier 3'];
  const statuses = ['paid', 'pending', 'failed', 'paid', 'paid', 'paid', 'pending'];
  const payouts = [];
  
  for (let i = 0; i < count; i++) {
    const id = i + 8; // Start after existing entries
    const tier = tiers[Math.floor(Math.random() * tiers.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const ytdTotal = Math.floor(Math.random() * 20000) + 3000;
    const lastAmount = Math.floor(Math.random() * 4000) + 1000;
    
    payouts.push({
      agentId: `EON${id.toString().padStart(3, '0')}`,
      name: `Agent ${id}`,
      tier,
      lastAmount,
      lastDate: status === 'paid' ? '2025-04-15' : '',
      nextDate: status !== 'failed' ? '2025-05-15' : '',
      ytdTotal,
      status
    });
  }
  
  return payouts;
};

// Base data - agents that already exist
export const baseAgents: Agent[] = [
  {
    id: '1',
    name: 'Ahmad Bin Abdullah',
    mobile: '60123456789',
    email: 'ahmad@example.com',
    status: 'active',
    joinDate: '2024-01-15',
    region: 'Kuala Lumpur',
    nric: '901234567890',
    dob: '1990-05-15',
    address: '123 Jalan Bukit Bintang, Kuala Lumpur',
    bankName: 'Maybank',
    accountNumber: '1234567890',
    kwspNumber: 'KWSP123456',
    taxId: 'TAX123456',
    agentId: 'EON001',
    sponsor: 'Sarah Lee',
    commissionTier: 'Tier 1',
    ytdSales: 150000,
    ytdCommission: 15000,
    lastPayout: 3500,
    lastPayoutDate: '2025-04-15',
    nextPaymentDate: '2025-05-15',
    trainingModules: [
      { name: 'Product Knowledge', completed: true, date: '2024-01-20' },
      { name: 'Sales Techniques', completed: true, date: '2024-01-25' },
      { name: 'Compliance Training', completed: true, date: '2024-02-01' }
    ],
    performance: [
      { month: 'Jan', sales: 25000, target: 20000 },
      { month: 'Feb', sales: 30000, target: 25000 },
      { month: 'Mar', sales: 35000, target: 30000 },
      { month: 'Apr', sales: 30000, target: 30000 }
    ],
    documents: [
      { name: 'NRIC', type: 'pdf', url: '#' },
      { name: 'NDA', type: 'pdf', url: '#' },
      { name: 'Agreement', type: 'pdf', url: '#' }
    ],
    gender: 'M'
  },
  {
    id: '2',
    name: 'Siti Binti Mohammed',
    mobile: '60187654321',
    email: 'siti@example.com',
    status: 'pending',
    joinDate: '2025-04-20',
    region: 'Penang',
    nric: '880987654321',
    dob: '1988-10-10',
    address: '45 Jalan Masjid Kapitan Keling, Georgetown, Penang',
    bankName: 'CIMB',
    accountNumber: '9876543210',
    kwspNumber: 'KWSP654321',
    taxId: 'TAX654321',
    agentId: 'EON002',
    sponsor: 'Tan Wei Ling',
    commissionTier: 'Tier 2',
    ytdSales: 75000,
    ytdCommission: 6000,
    lastPayout: 2000,
    lastPayoutDate: '2025-04-15',
    nextPaymentDate: '2025-05-15',
    trainingModules: [
      { name: 'Product Knowledge', completed: true, date: '2025-04-25' },
      { name: 'Sales Techniques', completed: false, date: '' },
      { name: 'Compliance Training', completed: false, date: '' }
    ],
    performance: [
      { month: 'Apr', sales: 15000, target: 15000 }
    ],
    documents: [
      { name: 'NRIC', type: 'pdf', url: '#' },
      { name: 'NDA', type: 'pdf', url: '#' }
    ],
    gender: 'F'
  },
  {
    id: '3',
    name: 'Raj Kumar',
    mobile: '60198765432',
    email: 'raj@example.com',
    status: 'active',
    joinDate: '2024-02-10',
    region: 'Johor',
    nric: '850123456789',
    dob: '1985-03-22',
    address: '78 Jalan Dhoby, Johor Bahru',
    bankName: 'RHB',
    accountNumber: '5432167890',
    kwspNumber: 'KWSP987654',
    taxId: 'TAX987654',
    agentId: 'EON003',
    sponsor: 'Michael Tan',
    commissionTier: 'Tier 1',
    ytdSales: 180000,
    ytdCommission: 18000,
    lastPayout: 4000,
    lastPayoutDate: '2025-04-15',
    nextPaymentDate: '2025-05-15',
    trainingModules: [
      { name: 'Product Knowledge', completed: true, date: '2024-02-15' },
      { name: 'Sales Techniques', completed: true, date: '2024-02-20' },
      { name: 'Compliance Training', completed: true, date: '2024-02-25' }
    ],
    performance: [
      { month: 'Feb', sales: 20000, target: 20000 },
      { month: 'Mar', sales: 45000, target: 30000 },
      { month: 'Apr', sales: 50000, target: 40000 }
    ],
    documents: [
      { name: 'NRIC', type: 'pdf', url: '#' },
      { name: 'NDA', type: 'pdf', url: '#' },
      { name: 'Agreement', type: 'pdf', url: '#' }
    ],
    gender: 'M'
  },
  {
    id: '4',
    name: 'Lee Wei Chen',
    mobile: '60138765432',
    email: 'lee@example.com',
    status: 'rejected',
    joinDate: '2025-04-05',
    region: 'Selangor',
    nric: '920123456789',
    dob: '1992-07-18',
    address: '25 SS15/5A, Subang Jaya, Selangor',
    bankName: 'Hong Leong',
    accountNumber: '6789012345',
    kwspNumber: 'KWSP456789',
    taxId: 'TAX456789',
    agentId: 'EON004',
    sponsor: 'Ahmad Ibrahim',
    commissionTier: 'Tier 3',
    ytdSales: 0,
    ytdCommission: 0,
    lastPayout: 0,
    lastPayoutDate: '',
    nextPaymentDate: '',
    trainingModules: [
      { name: 'Product Knowledge', completed: true, date: '2025-04-10' },
      { name: 'Sales Techniques', completed: false, date: '' },
      { name: 'Compliance Training', completed: false, date: '' }
    ],
    performance: [],
    documents: [
      { name: 'NRIC', type: 'pdf', url: '#' }
    ],
    gender: 'M'
  },
  {
    id: '5',
    name: 'Nurul Huda',
    mobile: '60167890123',
    email: 'nurul@example.com',
    status: 'active',
    joinDate: '2023-11-20',
    region: 'Sabah',
    nric: '870123456789',
    dob: '1987-12-03',
    address: '10 Jalan Gaya, Kota Kinabalu, Sabah',
    bankName: 'Public Bank',
    accountNumber: '7890123456',
    kwspNumber: 'KWSP789012',
    taxId: 'TAX789012',
    agentId: 'EON005',
    sponsor: 'Lisa Wong',
    commissionTier: 'Tier 2',
    ytdSales: 120000,
    ytdCommission: 9600,
    lastPayout: 2500,
    lastPayoutDate: '2025-04-15',
    nextPaymentDate: '2025-05-15',
    trainingModules: [
      { name: 'Product Knowledge', completed: true, date: '2023-11-25' },
      { name: 'Sales Techniques', completed: true, date: '2023-12-01' },
      { name: 'Compliance Training', completed: true, date: '2023-12-10' }
    ],
    performance: [
      { month: 'Dec', sales: 22000, target: 20000 },
      { month: 'Jan', sales: 25000, target: 22000 },
      { month: 'Feb', sales: 28000, target: 25000 },
      { month: 'Mar', sales: 30000, target: 28000 },
      { month: 'Apr', sales: 32000, target: 30000 }
    ],
    documents: [
      { name: 'NRIC', type: 'pdf', url: '#' },
      { name: 'NDA', type: 'pdf', url: '#' },
      { name: 'Agreement', type: 'pdf', url: '#' }
    ],
    gender: 'F'
  }
];

// Generate 73 additional agents
const additionalAgents = generateAgents(73);

// Combine base agents with generated agents
export const mockAgents: Agent[] = [...baseAgents, ...additionalAgents];

// Base dashboard data
export const baseDashboardData = {
  totalAgents: 126,
  activeAgents: 98,
  pendingApprovals: 15,
  approvedThisMonth: 12,
  ytdCommissionPaid: 356000,
  avgApprovalTime: '2.3 days',
  
  monthlyRegistrations: [
    { month: 'Dec', count: 8 },
    { month: 'Jan', count: 12 },
    { month: 'Feb', count: 15 },
    { month: 'Mar', count: 10 },
    { month: 'Apr', count: 18 },
    { month: 'May', count: 12 }
  ],
  
  regionDistribution: [
    { region: 'Kuala Lumpur', count: 45 },
    { region: 'Selangor', count: 38 },
    { region: 'Penang', count: 20 },
    { region: 'Johor', count: 15 },
    { region: 'Sabah', count: 8 }
  ],
  
  recentlyApproved: [
    { id: 'EON023', name: 'Tan Mei Lin', joinDate: '2025-05-01', email: 'tan.meilin@example.com', status: 'active', region: 'Penang' },
    { id: 'EON022', name: 'Hassan bin Musa', joinDate: '2025-04-29', email: 'hassan@example.com', status: 'active', region: 'Kuala Lumpur' },
    { id: 'EON021', name: 'Kavita Rai', joinDate: '2025-04-28', email: 'kavita@example.com', status: 'active', region: 'Selangor' },
    { id: 'EON020', name: 'Wong Jun Wei', joinDate: '2025-04-26', email: 'wong.jw@example.com', status: 'active', region: 'Johor' },
    { id: 'EON019', name: 'Aisha Binti Ahmad', joinDate: '2025-04-25', email: 'aisha@example.com', status: 'active', region: 'Kelantan' },
    { id: 'EON018', name: 'David Chen', joinDate: '2025-04-24', email: 'david.c@example.com', status: 'active', region: 'Penang' },
    { id: 'EON017', name: 'Surinder Singh', joinDate: '2025-04-23', email: 'surinder@example.com', status: 'active', region: 'Selangor' },
    { id: 'EON016', name: 'Lily Tan', joinDate: '2025-04-22', email: 'lily@example.com', status: 'active', region: 'Kuala Lumpur' },
    { id: 'EON015', name: 'Chong Wei Ming', joinDate: '2025-04-21', email: 'chong.wm@example.com', status: 'active', region: 'Sarawak' },
    { id: 'EON014', name: 'Fatimah Zahra', joinDate: '2025-04-20', email: 'fatimah@example.com', status: 'active', region: 'Kelantan' },
    { id: 'EON013', name: 'Jason Lee', joinDate: '2025-04-19', email: 'jason@example.com', status: 'active', region: 'Kuala Lumpur' },
    { id: 'EON012', name: 'Kumar Patel', joinDate: '2025-04-18', email: 'kumar@example.com', status: 'active', region: 'Penang' }
  ]
};

// Update the dashboard data with more agents
export const dashboardData = {
  ...baseDashboardData,
  totalAgents: mockAgents.length,
  activeAgents: mockAgents.filter(agent => agent.status === 'active').length,
  pendingApprovals: mockAgents.filter(agent => agent.status === 'pending').length
};

// Base commission data
export const baseCommissionData = {
  totalPaidThisMonth: 42500,
  totalPending: 18500,
  payouts: [
    {
      agentId: 'EON001',
      name: 'Ahmad Bin Abdullah',
      tier: 'Tier 1',
      lastAmount: 3500,
      lastDate: '2025-04-15',
      nextDate: '2025-05-15',
      ytdTotal: 15000,
      status: 'paid'
    },
    {
      agentId: 'EON003',
      name: 'Raj Kumar',
      tier: 'Tier 1',
      lastAmount: 4000,
      lastDate: '2025-04-15',
      nextDate: '2025-05-15',
      ytdTotal: 18000,
      status: 'paid'
    },
    {
      agentId: 'EON005',
      name: 'Nurul Huda',
      tier: 'Tier 2',
      lastAmount: 2500,
      lastDate: '2025-04-15',
      nextDate: '2025-05-15',
      ytdTotal: 9600,
      status: 'paid'
    },
    {
      agentId: 'EON010',
      name: 'David Chen',
      tier: 'Tier 1',
      lastAmount: 3800,
      lastDate: '2025-04-15',
      nextDate: '2025-05-15',
      ytdTotal: 16200,
      status: 'paid'
    },
    {
      agentId: 'EON012',
      name: 'Farah Lim',
      tier: 'Tier 2',
      lastAmount: 2300,
      lastDate: '2025-04-15',
      nextDate: '2025-05-15',
      ytdTotal: 8900,
      status: 'pending'
    },
    {
      agentId: 'EON015',
      name: 'Vikram Singh',
      tier: 'Tier 3',
      lastAmount: 1200,
      lastDate: '2025-04-15',
      nextDate: '2025-05-15',
      ytdTotal: 4500,
      status: 'pending'
    },
    {
      agentId: 'EON018',
      name: 'Lily Tan',
      tier: 'Tier 2',
      lastAmount: 2200,
      lastDate: '2025-04-15',
      nextDate: '2025-05-15',
      ytdTotal: 7800,
      status: 'failed'
    }
  ]
};

// Generate 71 additional commission payout entries
const additionalCommissionPayouts = generateCommissionPayouts(71);

// Combine base payouts with generated payouts
export const commissionData = {
  ...baseCommissionData,
  payouts: [...baseCommissionData.payouts, ...additionalCommissionPayouts]
};
