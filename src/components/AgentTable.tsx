
import React, { useState } from 'react';
import { Search, Filter, Eye, Trash2, MoreHorizontal, Check } from 'lucide-react';
import { Agent } from '../utils/mockData';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

type AgentTableProps = {
  agents: Agent[];
  onSelectAgent: (agent: Agent) => void;
  selectedAgentId: string | null;
};

const AgentTable: React.FC<AgentTableProps> = ({
  agents,
  onSelectAgent,
  selectedAgentId
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [genderFilter, setGenderFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const itemsPerPage = 10;

  const filteredAgents = agents.filter(agent => {
    // Apply search filter
    const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) || agent.agentId.toLowerCase().includes(searchTerm.toLowerCase()) || agent.mobile.includes(searchTerm) || agent.email.toLowerCase().includes(searchTerm.toLowerCase()) || agent.nric.includes(searchTerm);

    // Apply status filter
    const matchesStatus = statusFilter === 'all' || agent.status === statusFilter;

    // Apply gender filter
    const matchesGender = genderFilter === 'all' || agent.gender === genderFilter;

    // Apply region filter
    const matchesRegion = regionFilter === 'all' || agent.region && agent.region.includes(regionFilter);
    return matchesSearch && matchesStatus && matchesGender && matchesRegion;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAgents = filteredAgents.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage);

  // Handle view agent detail
  const handleViewAgent = (agent: Agent, e: React.MouseEvent) => {
    e.stopPropagation();
    onSelectAgent(agent);
    navigate(`/agents/${agent.id}`);
  };

  // Handle delete agent
  const handleDeleteClick = (agent: Agent, e: React.MouseEvent) => {
    e.stopPropagation();
    setAgentToDelete(agent);
    setDeleteDialogOpen(true);
  };

  // Handle approve agent
  const handleApproveClick = (agent: Agent, e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Agent Approved",
      description: `${agent.name} has been approved successfully.`
    });
  };

  // Handle edit agent
  const handleEditClick = (agent: Agent, e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: "Edit Agent",
      description: `Editing ${agent.name}'s details.`
    });
  };

  const confirmDelete = () => {
    if (agentToDelete) {
      toast({
        title: "Agent Deleted",
        description: `${agentToDelete.name} has been deleted successfully.`
      });
      // In a real app, you would make an API call to delete the agent
      // and update the agents list after successful deletion
    }
    setDeleteDialogOpen(false);
    setAgentToDelete(null);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get unique regions for filter dropdown
  const regions = ['all', ...new Set(agents.map(agent => agent.region?.split(',')[1]?.trim()).filter(Boolean))];
  
  return <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <input type="text" placeholder="Search agents..." className="pl-9 pr-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#00205C] text-sm" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
          
          <div className="flex items-center space-x-2">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>

            <select className="text-sm rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#00205C]" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {showFilters && <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select className="w-full text-sm rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#00205C]" value={genderFilter} onChange={e => setGenderFilter(e.target.value)}>
                <option value="all">All Genders</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <select className="w-full text-sm rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-1 focus:ring-[#00205C]" value={regionFilter} onChange={e => setRegionFilter(e.target.value)}>
                <option value="all">All States</option>
                {regions.filter(r => r !== 'all').map(region => <option key={region} value={region}>{region}</option>)}
              </select>
            </div>
          </div>}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3 bg-gray-50">#</th>
              <th className="px-6 py-3 bg-gray-50">Agent ID</th>
              <th className="px-6 py-3 bg-gray-50">Full Name</th>
              <th className="px-6 py-3 bg-gray-50">Email Address</th>
              <th className="px-6 py-3 bg-gray-50">NRIC</th>
              <th className="px-6 py-3 bg-gray-50">Mobile</th>
              <th className="px-6 py-3 bg-gray-50">DOB</th>
              <th className="px-6 py-3 bg-gray-50">Bank Account #</th>
              <th className="px-6 py-3 bg-gray-50">Issuing Bank</th>
              <th className="px-6 py-3 bg-gray-50">Branch</th>
              <th className="px-6 py-3 bg-gray-50">District, State</th>
              <th className="px-6 py-3 bg-gray-50">Gender</th>
              <th className="px-6 py-3 bg-gray-50">Status</th>
              <th className="px-6 py-3 bg-gray-50">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentAgents.length > 0 ? currentAgents.map((agent, index) => <tr key={agent.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{indexOfFirstItem + index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button onClick={e => handleViewAgent(agent, e)} className="focus:outline-none text-blue-500">
                    {agent.agentId}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.nric}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{new Date(agent.dob).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.accountNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.bankName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.branch || "EON AUTO MART GLENMARIE"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.region}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{agent.gender || 'N/A'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeClass(agent.status)}`}>
                    {agent.status.charAt(0).toUpperCase() + agent.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex items-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center justify-center h-8 w-8 rounded-full hover:bg-gray-100">
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleViewAgent(agent, e as unknown as React.MouseEvent);
                        }}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleEditClick(agent, e as unknown as React.MouseEvent);
                        }}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Edit</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          handleApproveClick(agent, e as unknown as React.MouseEvent);
                        }}>
                          <Check className="mr-2 h-4 w-4" />
                          <span>Approve</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>) : <tr>
                <td colSpan={14} className="px-6 py-4 text-center text-sm text-gray-500">
                  No agents found
                </td>
              </tr>}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredAgents.length > 0 && <div className="py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"} />
              </PaginationItem>
              
              {Array.from({
            length: Math.min(totalPages, 5)
          }).map((_, i) => {
            // Show pagination numbers based on current page
            let pageNumber;
            if (totalPages <= 5) {
              pageNumber = i + 1;
            } else if (currentPage <= 3) {
              pageNumber = i + 1;
              if (i === 4) pageNumber = totalPages;
            } else if (currentPage >= totalPages - 2) {
              pageNumber = totalPages - 4 + i;
            } else {
              pageNumber = currentPage - 2 + i;
            }
            return <PaginationItem key={i}>
                <PaginationLink isActive={pageNumber === currentPage} onClick={() => setCurrentPage(pageNumber)} className="cursor-pointer">
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>;
          })}
              
              <PaginationItem>
                <PaginationNext onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Agent</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {agentToDelete?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-[#E5241B] hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>;
};
export default AgentTable;
