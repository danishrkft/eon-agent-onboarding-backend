
export type Agent = {
  id: string;
  name: string;
  mobile: string;
  email: string;
  status: 'active' | 'pending' | 'rejected';
  joinDate: string;
  region: string;
  nric: string;
  dob: string;
  address: string;
  bankName: string;
  accountNumber: string;
  kwspNumber: string;
  taxId: string;
  agentId: string;
  sponsor: string;
  commissionTier: string;
  ytdSales: number;
  ytdCommission: number;
  lastPayout: number;
  lastPayoutDate: string;
  nextPaymentDate: string;
  trainingModules: { name: string; completed: boolean; date: string }[];
  performance: { month: string; sales: number; target: number }[];
  documents: { name: string; type: string; url: string }[];
};

export const mockAgents: Agent[] = [
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
    ]
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
    ]
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
    ]
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
    ]
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
    ]
  }
];

export const dashboardData = {
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
    { id: 'EON023', name: 'Tan Mei Lin', joinDate: '2025-05-01' },
    { id: 'EON022', name: 'Hassan bin Musa', joinDate: '2025-04-29' },
    { id: 'EON021', name: 'Kavita Rai', joinDate: '2025-04-28' },
    { id: 'EON020', name: 'Wong Jun Wei', joinDate: '2025-04-26' },
  ]
};

export const commissionData = {
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
