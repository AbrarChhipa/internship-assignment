import React, { useState } from 'react';
import { Box, Typography, IconButton, List, ListItem, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

const departmentsData = [
    {
        department: 'customer_service',
        sub_departments: [
            'support',
            'customer_success'
        ]
    },
    {
        department: 'design',
        sub_departments: [
            'graphic_design',
            'product_design',
            'web_design',
            'ui_design'
        ]
    }
];

const DepartmentList: React.FC = () => {
    const [expandedDepartments, setExpandedDepartments] = useState<{ [key: string]: boolean }>({});

    const handleToggle = (department: string) => {
        setExpandedDepartments((prevExpanded) => ({
            ...prevExpanded,
            [department]: !prevExpanded[department]
        }));
    };

    return (
        <List>
            {departmentsData.map((dept, index) => (
                <Box key={index}>
                    <ListItem>
                        <ListItemText primary={dept.department} />
                        {dept.sub_departments.length > 0 && (
                            <IconButton onClick={() => handleToggle(dept.department)}>
                                {expandedDepartments[dept.department] ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>
                        )}
                    </ListItem>
                    {expandedDepartments[dept.department] && (
                        <List component="div" disablePadding>
                            {dept.sub_departments.map((subDept, subIndex) => (
                                <ListItem key={subIndex} sx={{ pl: 4 }}>
                                    <ListItemText primary={subDept} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </Box>
            ))}
        </List>
    );
};

export default DepartmentList;
