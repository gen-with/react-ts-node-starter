import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import {
  Box,
  Button,
  Drawer,
  IconButton,
  TextField,
  Typography
} from '@mui/material';
import { Add, Edit, Delete, Close } from '@mui/icons-material';
import axios from 'axios';

interface Proposal {
  id: string;
  solicitationId?: string;
  topicId?: string;
  title: string;
  number?: string;
  product_req_doc?: string;
  tech_spec?: string;
  proposal?: string;
  presentation?: string;
  status?: string;
  isDeleted: boolean;
  createdDate: Date;
  updatedDate: Date;
  createdBy?: string;
  updatedBy?: string;
}

// Mock data for proposals
const mockProposals: Proposal[] = [
  {
    id: '1',
    title: 'Proposal 1',
    number: 'P-001',
    status: 'Submitted',
    isDeleted: false,
    createdDate: new Date(),
    updatedDate: new Date()
  },
  {
    id: '2',
    title: 'Proposal 2',
    number: 'P-002',
    status: 'In Review',
    isDeleted: false,
    createdDate: new Date(),
    updatedDate: new Date()
  },
  {
    id: '3',
    title: 'Proposal 3',
    number: 'P-003',
    status: 'Approved',
    isDeleted: false,
    createdDate: new Date(),
    updatedDate: new Date()
  }
];


const fetchProposals = async (): Promise<Proposal[]> => {
  // Replace actual API call with mock data
  // const response = await axios.get<Proposal[]>('http://localhost:8081/api/v1/proposals');
  // return response.data;\
  console.log('#'.repeat(40))
  return mockProposals;
};

// const addProposal = async (proposal: Partial<Proposal>): Promise<Proposal> => {
//   const response = await axios.post('/api/v1/proposals', proposal);
//   return response.data;
// };

// const updateProposal = async (proposal: Partial<Proposal>): Promise<Proposal> => {
//   const response = await axios.put(`/api/v1/proposals/${proposal.id}`, proposal);
//   return response.data;
// };

// const deleteProposal = async (id: string): Promise<void> => {
//   await axios.delete(`/api/v1/proposals/${id}`);
// };

const ProposalComponent: React.FC = () => {

  const { data: proposals, isLoading, isError } = useQuery<Proposal[]>({
    queryKey: ['proposals'],
    queryFn: fetchProposals
  });

  

  // const mutationAdd = useMutation<Proposal, unknown, Partial<Proposal>>(addProposal, {
  //   onSuccess: () => queryClient.invalidateQueries(['proposals']),
  // });

  // const mutationUpdate = useMutation<Proposal, unknown, Partial<Proposal>>(updateProposal, {
  //   onSuccess: () => queryClient.invalidateQueries(['proposals']),
  // });

  // const mutationDelete = useMutation<void, unknown, string>(deleteProposal, {
  //   onSuccess: () => queryClient.invalidateQueries(['proposals']),
  // });

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentProposal, setCurrentProposal] = useState<Partial<Proposal>>({});
  const [isEdit, setIsEdit] = useState(false);

  const handleDrawerOpen = (proposal?: Proposal) => {
    if (proposal) {
      setCurrentProposal(proposal);
      setIsEdit(true);
    } else {
      setCurrentProposal({});
      setIsEdit(false);
    }
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentProposal({ ...currentProposal, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // if (isEdit) {
    //   mutationUpdate.mutate(currentProposal as Proposal);
    // } else {
    //   mutationAdd.mutate(currentProposal);
    // }
    handleDrawerClose();
  };

  const handleDelete = (id: string) => {
    // mutationDelete.mutate(id);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'number', headerName: 'Number', width: 150 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleDrawerOpen(params.row as Proposal)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id as string)}>
            <Delete />
          </IconButton>
        </>
      )
    }
  ];

  const rows: GridRowsProp = proposals?.map((proposal: { id: any; }) => ({
    ...proposal,
    id: proposal.id
  })) || [];

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Error fetching data</Typography>;
  }

  console.log(proposals);

  return (
    <>
      <Box>
        <Box mt={2} style={{ height: 400, width: '100%' }}>
          <DataGrid rows={rows} columns={columns} checkboxSelection />
        </Box>
      </Box>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerClose}
        PaperProps={{ sx: { width: '30%' } }}
      >
        <Box p={2} role="presentation">
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{isEdit ? "Edit Proposal" : "Add Proposal"}</Typography>
            <IconButton onClick={handleDrawerClose}>
              <Close />
            </IconButton>
          </Box>
          <TextField
            margin="dense"
            label="Title"
            name="title"
            value={currentProposal.title || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Number"
            name="number"
            value={currentProposal.number || ''}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Status"
            name="status"
            value={currentProposal.status || ''}
            onChange={handleChange}
            fullWidth
          />
          {/* Add more fields as required */}
          <Box mt={2} display="flex" justifyContent="space-between">
            <Button onClick={handleDrawerClose} color="secondary">Cancel</Button>
            <Button onClick={handleSubmit} color="primary">{isEdit ? "Update" : "Add"}</Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default ProposalComponent;
