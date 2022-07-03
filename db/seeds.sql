INSERT INTO department (department_name)
VALUES
    ('Design'),
    ('Sales'),
    ('In House');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Designer', 60000, 1),
    ('Human Resources', 50000, 3),
    ('Engineer', 100000, 1),
    ('Surveyor', 40000, 1),
    ('Salesman', 50000, 2),
    ('Sales Management', 75000, 2),
    ('Caller', 40000, 2),
    ('Founder', 100000, 3),
    ('Warehouse', 50000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
    ('Alex', 'Lu', 1),
    ('Patrick', 'Starliper', 3),
    ('Rebecca', 'Rodriguez', 2),
    ('Cristina', 'Faz', 6),
    ('Jonathan', 'Wang', 8),
    ('Eric', 'Winters', 2),
    ('Druvh', 'Patel', 7);