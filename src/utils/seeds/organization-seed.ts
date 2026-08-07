import { transformMenuItemParams } from "../menu-item-params.transformer.js";
import { prisma } from "../prisma.js";
import type { SeedItemLookup } from "./menu-items-seed.js";
import { createOrganizationAnalysisItemData } from "./organization-analysis-seed.js";
import {
	createChildRelation,
	createColumn,
	createConfiguredItemData,
	createDeleteQueryHandler,
	createFolderItemData,
	createFullPermissions,
	createFunctionDataLookup,
	createFunctionQueryLookup,
	createQueryLookup,
	parseMenuItemParams,
	type SeedMenuItemData,
} from "./seed-helpers.js";

export function createOrganizationItemData(): SeedMenuItemData[] {
	const params = createMockDatabaseParams();

	return [
		createFolderItemData("workforce", "Workforce", "users", "#2563eb"),
		createFolderItemData("project-management", "Project Management", "diagram-project", "#7c3aed"),
		createFolderItemData("analysis", "Analysis", "chart-simple", "#b45309"),
		createConfiguredItemData("departments", "Departments", "building", "#0f766e", params.departments),
		createConfiguredItemData("job-titles", "Job Titles", "id-badge", "#0369a1", params.jobTitles),
		createConfiguredItemData("employees", "Employees", "address-card", "#2563eb", params.employees),
		createConfiguredItemData("projects", "Projects", "briefcase", "#7c3aed", params.projects),
		createConfiguredItemData(
			"employee-projects",
			"Project Assignments",
			"user-clock",
			"#9333ea",
			params.employeeProjects,
		),
		...createOrganizationAnalysisItemData(),
	];
}

export async function seedOrganizationMenu(item: SeedItemLookup) {
	const menu = await prisma.menu.create({
		data: {
			code: "organization",
			mainText: "Organization",
			subText: "People and Project Operations",
		},
	});

	const workforce = await prisma.menuItemPerMenu.create({
		data: {
			menuId: menu.id,
			menuItemId: item("workforce").id,
			order: 1,
		},
	});

	const projectManagement = await prisma.menuItemPerMenu.create({
		data: {
			menuId: menu.id,
			menuItemId: item("project-management").id,
			order: 2,
		},
	});

	const analysis = await prisma.menuItemPerMenu.create({
		data: {
			menuId: menu.id,
			menuItemId: item("analysis").id,
			order: 3,
		},
	});

	await prisma.menuItemPerMenu.createMany({
		data: [
			{
				menuId: menu.id,
				menuItemId: item("departments").id,
				parentId: workforce.id,
				order: 1,
			},
			{
				menuId: menu.id,
				menuItemId: item("job-titles").id,
				parentId: workforce.id,
				order: 2,
			},
			{
				menuId: menu.id,
				menuItemId: item("employees").id,
				parentId: workforce.id,
				order: 3,
			},
			{
				menuId: menu.id,
				menuItemId: item("projects").id,
				parentId: projectManagement.id,
				order: 1,
			},
			{
				menuId: menu.id,
				menuItemId: item("employee-projects").id,
				parentId: projectManagement.id,
				order: 2,
			},
			{
				menuId: menu.id,
				menuItemId: item("department-analysis").id,
				parentId: analysis.id,
				order: 1,
			},
			{
				menuId: menu.id,
				menuItemId: item("employee-analysis").id,
				parentId: analysis.id,
				order: 2,
			},
			{
				menuId: menu.id,
				menuItemId: item("project-analysis").id,
				parentId: analysis.id,
				order: 3,
			},
		],
	});
}

function createMockDatabaseParams() {
	const departmentsBase = parseMenuItemParams({
		tableName: "departments",
		columns: [
			createColumn("department_id", "Department ID", "number", {
				primaryKey: true,
				insertEnabled: false,
				updateEnabled: false,
			}),
			createColumn("department_name", "Department name", "text", {
				insertRequired: true,
				updateRequired: true,
				operators: ["contains", "startsWith", "equals", "notEquals"],
				defaultOperator: "contains",
			}),
			createColumn("location", "Location", "text", {
				operators: ["contains", "startsWith", "equals"],
				defaultOperator: "contains",
			}),
			createColumn("annual_budget", "Annual budget", "number", {
				insertRequired: true,
				updateRequired: true,
				operators: ["equals", "greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
			createColumn("created_at", "Created at", "datetime", {
				insertEnabled: false,
				updateEnabled: false,
				operators: ["greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
		],
		handlers: {
			select: {
				kind: "query",
				src: `SELECT department_id, department_name, location, annual_budget, created_at
FROM departments
ORDER BY department_name`,
			},
			insert: {
				kind: "function-query",
				src: `({ location = null }) => {
	const locationSql = location === null || location === "" ? "NULL" : "N'@{location}'";
	return "INSERT INTO departments (department_name, location, annual_budget) VALUES (N'@{department_name}', " +
		locationSql +
		", @{annual_budget})";
}`,
			},
			update: {
				kind: "function-query",
				src: `({ department_id = 0, location = null }) => {
	const locationSql = location === null || location === "" ? "NULL" : "N'@{location}'";
	return "UPDATE departments SET department_name = N'@{department_name}', location = " +
		locationSql +
		", annual_budget = @{annual_budget} WHERE department_id = " +
		Number(department_id);
}`,
			},
			delete: createDeleteQueryHandler("departments", "department_id"),
		},
		permissions: createFullPermissions(),
		children: [],
	});

	const jobTitlesBase = parseMenuItemParams({
		tableName: "job_titles",
		columns: [
			createColumn("job_title_id", "Job title ID", "number", {
				primaryKey: true,
				insertEnabled: false,
				updateEnabled: false,
			}),
			createColumn("job_title_name", "Job title", "text", {
				insertRequired: true,
				updateRequired: true,
				operators: ["contains", "startsWith", "equals", "notEquals"],
				defaultOperator: "contains",
			}),
			createColumn("min_salary", "Minimum salary", "number", {
				insertRequired: true,
				updateRequired: true,
				operators: ["equals", "greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
			createColumn("max_salary", "Maximum salary", "number", {
				insertRequired: true,
				updateRequired: true,
				operators: ["equals", "greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
		],
		handlers: {
			select: {
				kind: "query",
				src: `SELECT job_title_id, job_title_name, min_salary, max_salary
FROM job_titles
ORDER BY job_title_name`,
			},
			insert: {
				kind: "query",
				src: `INSERT INTO job_titles (job_title_name, min_salary, max_salary)
VALUES (N'@{job_title_name}', @{min_salary}, @{max_salary})`,
			},
			update: {
				kind: "query",
				src: `UPDATE job_titles
SET job_title_name = N'@{job_title_name}', min_salary = @{min_salary}, max_salary = @{max_salary}
WHERE job_title_id = @{job_title_id}`,
			},
			delete: createDeleteQueryHandler("job_titles", "job_title_id"),
		},
		permissions: createFullPermissions(),
		children: [],
	});

	const employeesBase = parseMenuItemParams({
		tableName: "employees",
		columns: [
			createColumn("employee_id", "Employee ID", "number", {
				primaryKey: true,
				insertEnabled: false,
				updateEnabled: false,
			}),
			createColumn("department_id", "Department", "number", {
				insertRequired: true,
				updateRequired: true,
				lookup: createQueryLookup(
					"SELECT department_id AS value, department_name AS label FROM departments ORDER BY department_name",
				),
			}),
			createColumn("job_title_id", "Job title", "number", {
				insertRequired: true,
				updateRequired: true,
				lookup: createQueryLookup(
					"SELECT job_title_id AS value, job_title_name AS label FROM job_titles ORDER BY job_title_name",
				),
			}),
			createColumn("manager_id", "Manager", "number", {
				lookup: createFunctionQueryLookup(
					`({ employee_id = 0, department_id = [] }) => {
	const departmentIds = (Array.isArray(department_id) ? department_id : [department_id])
		.map(Number)
		.filter((value) => Number.isInteger(value) && value > 0);
	const employeeId = Array.isArray(employee_id) ? 0 : Number(employee_id);
	const filters = [departmentIds.length ? "department_id IN (" + departmentIds.join(", ") + ")" : "1 = 0"];
	if (Number.isInteger(employeeId) && employeeId > 0) filters.push("employee_id <> " + employeeId);
	return "SELECT employee_id AS value, first_name + ' ' + last_name AS label FROM employees WHERE " +
		filters.join(" AND ") +
		" ORDER BY last_name, first_name";
}`,
					{
						criteriaDependsOn: ["department_id"],
						insertDependsOn: ["department_id"],
						updateDependsOn: ["department_id"],
					},
				),
			}),
			createColumn("first_name", "First name", "text", {
				insertRequired: true,
				updateRequired: true,
				operators: ["contains", "startsWith", "equals"],
				defaultOperator: "startsWith",
			}),
			createColumn("last_name", "Last name", "text", {
				insertRequired: true,
				updateRequired: true,
				operators: ["contains", "startsWith", "equals"],
				defaultOperator: "startsWith",
			}),
			createColumn("email", "Email", "text", {
				insertRequired: true,
				updateRequired: true,
				operators: ["contains", "startsWith", "equals"],
				defaultOperator: "contains",
			}),
			createColumn("phone", "Phone", "text", {
				operators: ["contains", "startsWith", "equals"],
				defaultOperator: "contains",
			}),
			createColumn("hire_date", "Hire date", "date", {
				insertRequired: true,
				updateRequired: true,
				operators: ["greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
			createColumn("salary", "Salary", "number", {
				insertRequired: true,
				updateRequired: true,
				operators: ["equals", "greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
			createColumn("employment_status", "Employment status", "text", {
				insertRequired: true,
				updateRequired: true,
				lookup: createFunctionDataLookup(`() => ({
	success: true,
	data: [
		{ value: "ACTIVE", label: "Active" },
		{ value: "ON_LEAVE", label: "On leave" },
		{ value: "TERMINATED", label: "Terminated" }
	]
})`),
			}),
			createColumn("created_at", "Created at", "datetime", {
				insertEnabled: false,
				updateEnabled: false,
				operators: ["greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
		],
		handlers: {
			select: {
				kind: "query",
				src: `SELECT employee_id, department_id, job_title_id, manager_id, first_name, last_name,
	email, phone, hire_date, salary, employment_status, created_at
FROM employees
ORDER BY last_name, first_name`,
			},
			insert: {
				kind: "function-query",
				src: `({ manager_id = null, phone = null }) => {
	const managerSql = manager_id === null || manager_id === "" ? "NULL" : "@{manager_id}";
	const phoneSql = phone === null || phone === "" ? "NULL" : "N'@{phone}'";
	return "INSERT INTO employees (department_id, job_title_id, manager_id, first_name, last_name, " +
		"email, phone, hire_date, salary, employment_status) VALUES (" +
		"@{department_id}, @{job_title_id}, " + managerSql + ", N'@{first_name}', N'@{last_name}', " +
		"N'@{email}', " + phoneSql + ", '@{hire_date}', @{salary}, '@{employment_status}')";
}`,
			},
			update: {
				kind: "function-query",
				src: `({ manager_id = null, phone = null }) => {
	const managerSql = manager_id === null || manager_id === "" ? "NULL" : "@{manager_id}";
	const phoneSql = phone === null || phone === "" ? "NULL" : "N'@{phone}'";
	return "UPDATE employees SET department_id = @{department_id}, job_title_id = @{job_title_id}, manager_id = " +
		managerSql +
		", first_name = N'@{first_name}', last_name = N'@{last_name}', email = N'@{email}', phone = " +
		phoneSql +
		", hire_date = '@{hire_date}', salary = @{salary}, employment_status = '@{employment_status}' " +
		"WHERE employee_id = @{employee_id}";
}`,
			},
			delete: createDeleteQueryHandler("employees", "employee_id"),
		},
		permissions: createFullPermissions(),
		children: [],
	});

	const projectsBase = parseMenuItemParams({
		tableName: "projects",
		columns: [
			createColumn("project_id", "Project ID", "number", {
				primaryKey: true,
				insertEnabled: false,
				updateEnabled: false,
			}),
			createColumn("department_id", "Department", "number", {
				insertRequired: true,
				updateRequired: true,
				lookup: createQueryLookup(
					"SELECT department_id AS value, department_name AS label FROM departments ORDER BY department_name",
				),
			}),
			createColumn("project_name", "Project name", "text", {
				insertRequired: true,
				updateRequired: true,
				operators: ["contains", "startsWith", "equals", "notEquals"],
				defaultOperator: "contains",
			}),
			createColumn("start_date", "Start date", "date", {
				insertRequired: true,
				updateRequired: true,
				operators: ["greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
			createColumn("end_date", "End date", "date", {
				operators: ["greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
			createColumn("budget", "Budget", "number", {
				insertRequired: true,
				updateRequired: true,
				operators: ["equals", "greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
			createColumn("project_status", "Project status", "text", {
				insertRequired: true,
				updateRequired: true,
				lookup: createFunctionDataLookup(`() => ({
	success: true,
	data: [
		{ value: "PLANNED", label: "Planned" },
		{ value: "ACTIVE", label: "Active" },
		{ value: "ON_HOLD", label: "On hold" },
		{ value: "COMPLETED", label: "Completed" },
		{ value: "CANCELLED", label: "Cancelled" }
	]
})`),
			}),
		],
		handlers: {
			select: {
				kind: "query",
				src: `SELECT project_id, department_id, project_name, start_date, end_date, budget, project_status
FROM projects
ORDER BY start_date DESC, project_name`,
			},
			insert: {
				kind: "function-query",
				src: `({ end_date = null }) => {
	const endDateSql = end_date === null || end_date === "" ? "NULL" : "'@{end_date}'";
	return "INSERT INTO projects (department_id, project_name, start_date, end_date, budget, project_status) " +
		"VALUES (@{department_id}, N'@{project_name}', '@{start_date}', " +
		endDateSql +
		", @{budget}, '@{project_status}')";
}`,
			},
			update: {
				kind: "function-query",
				src: `({ project_id = 0, end_date = null }) => {
	const endDateSql = end_date === null || end_date === "" ? "NULL" : "'@{end_date}'";
	return "UPDATE projects SET department_id = @{department_id}, project_name = N'@{project_name}', " +
		"start_date = '@{start_date}', end_date = " + endDateSql +
		", budget = @{budget}, project_status = '@{project_status}' WHERE project_id = " +
		Number(project_id);
}`,
			},
			delete: createDeleteQueryHandler("projects", "project_id"),
		},
		permissions: createFullPermissions(),
		children: [],
	});

	const employeeProjectsBase = parseMenuItemParams({
		tableName: "employee_projects",
		columns: [
			createColumn("employee_id", "Employee", "number", {
				primaryKey: true,
				insertRequired: true,
				updateEnabled: false,
				lookup: createQueryLookup(
					"SELECT employee_id AS value, first_name + ' ' + last_name AS label FROM employees ORDER BY last_name, first_name",
					{ update: false, grid: true },
				),
			}),
			createColumn("project_id", "Project", "number", {
				primaryKey: true,
				insertRequired: true,
				updateEnabled: false,
				lookup: createQueryLookup(
					"SELECT project_id AS value, project_name AS label FROM projects ORDER BY project_name",
					{ update: false, grid: true },
				),
			}),
			createColumn("assigned_date", "Assigned date", "date", {
				insertRequired: true,
				updateRequired: true,
				operators: ["greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
			createColumn("role_name", "Project role", "text", {
				insertRequired: true,
				updateRequired: true,
				operators: ["contains", "startsWith", "equals"],
				defaultOperator: "contains",
			}),
			createColumn("allocation_percent", "Allocation %", "number", {
				insertRequired: true,
				updateRequired: true,
				operators: ["equals", "greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
			createColumn("hourly_rate", "Hourly rate", "number", {
				operators: ["equals", "greaterThanOrEqual", "lessThanOrEqual", "between"],
				defaultOperator: "between",
			}),
		],
		handlers: {
			select: {
				kind: "query",
				src: `SELECT employee_id, project_id, assigned_date, role_name, allocation_percent, hourly_rate
FROM employee_projects
ORDER BY assigned_date DESC`,
			},
			insert: {
				kind: "function-query",
				src: `({ hourly_rate = null }) => {
	const hourlyRateSql = hourly_rate === null || hourly_rate === "" ? "NULL" : "@{hourly_rate}";
	return "INSERT INTO employee_projects (employee_id, project_id, assigned_date, role_name, allocation_percent, hourly_rate) " +
		"VALUES (@{employee_id}, @{project_id}, '@{assigned_date}', N'@{role_name}', @{allocation_percent}, " +
		hourlyRateSql + ")";
}`,
			},
			update: {
				kind: "function-query",
				src: `({ hourly_rate = null }) => {
	const hourlyRateSql = hourly_rate === null || hourly_rate === "" ? "NULL" : "@{hourly_rate}";
	return "UPDATE employee_projects SET assigned_date = '@{assigned_date}', role_name = N'@{role_name}', " +
		"allocation_percent = @{allocation_percent}, hourly_rate = " + hourlyRateSql +
		" WHERE employee_id = @{employee_id} AND project_id = @{project_id}";
}`,
			},
			delete: createDeleteQueryHandler("employee_projects", "employee_id", "project_id"),
		},
		permissions: createFullPermissions(),
		children: [],
	});

	const departments = parseMenuItemParams({
		...departmentsBase,
		children: [
			createChildRelation("Department employees", "department_id", "department_id", employeesBase),
			createChildRelation("Department projects", "department_id", "department_id", projectsBase),
		],
	});

	const jobTitles = parseMenuItemParams({
		...jobTitlesBase,
		children: [createChildRelation("Employees with this job title", "job_title_id", "job_title_id", employeesBase)],
	});

	const employees = parseMenuItemParams({
		...employeesBase,
		children: [
			createChildRelation("Direct reports", "employee_id", "manager_id", employeesBase),
			createChildRelation("Project assignments", "employee_id", "employee_id", employeeProjectsBase),
		],
	});

	const projects = parseMenuItemParams({
		...projectsBase,
		children: [createChildRelation("Assigned employees", "project_id", "project_id", employeeProjectsBase)],
	});

	const params = {
		departments,
		jobTitles,
		employees,
		projects,
		employeeProjects: employeeProjectsBase,
	};

	for (const itemParams of Object.values(params)) {
		transformMenuItemParams(itemParams);
	}

	return params;
}
