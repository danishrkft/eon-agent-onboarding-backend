
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface EditPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditPermissionsModal: React.FC<EditPermissionsModalProps> = ({ isOpen, onClose }) => {
  const [permissions, setPermissions] = useState({
    "View Reports": { Admin: true, Manager: true, Editor: true, Viewer: true },
    "Edit Reports": { Admin: true, Manager: true, Editor: true, Viewer: false },
    "Manage Users": { Admin: true, Manager: false, Editor: false, Viewer: false },
    "Manage Settings": { Admin: true, Manager: false, Editor: false, Viewer: false },
    "Approve Applications": { Admin: true, Manager: true, Editor: false, Viewer: false },
    "Manage Campaigns": { Admin: true, Manager: true, Editor: true, Viewer: false }
  });

  const roles = ["Admin", "Manager", "Editor", "Viewer"];

  const handlePermissionChange = (permission: string, role: string, checked: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: {
        ...prev[permission as keyof typeof prev],
        [role]: checked
      }
    }));
  };

  const handleSave = () => {
    console.log('Updated permissions:', permissions);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Role Permissions</DialogTitle>
          <DialogDescription>
            Configure access levels for different user roles.
          </DialogDescription>
        </DialogHeader>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Permission</TableHead>
                {roles.map(role => (
                  <TableHead key={role}>{role}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(permissions).map(([permission, rolePerms]) => (
                <TableRow key={permission}>
                  <TableCell>{permission}</TableCell>
                  {roles.map(role => (
                    <TableCell key={role}>
                      <Checkbox 
                        checked={rolePerms[role as keyof typeof rolePerms]}
                        onCheckedChange={(checked) => 
                          handlePermissionChange(permission, role, checked as boolean)
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleSave} className="flex-1 bg-[#00205C] hover:bg-[#001A45]">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditPermissionsModal;
