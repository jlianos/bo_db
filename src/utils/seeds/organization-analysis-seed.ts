import { transformMenuItemParams } from "../menu-item-params.transformer.js";
import {
	createColumn,
	createConfiguredItemData,
	createFunctionDataLookup,
	createQueryLookup,
	parseMenuItemParams,
	type SeedColumn,
	type SeedMenuItemData,
} from "./seed-helpers.js";

type SeedColumnOptions = Parameters<typeof createColumn>[3];

const departmentLookup = () =>
	createQueryLookup(
		"SELECT department_id AS value, department_name AS label FROM departments ORDER BY department_name",
		{ criteriaMultiple: false, insert: false, update: false },
	);

const employeeLookup = () =>
	createQueryLookup(
		"SELECT employee_id AS value, first_name + ' ' + last_name AS label FROM employees ORDER BY last_name, first_name",
		{ criteriaMultiple: false, insert: false, update: false },
	);

const projectLookup = () =>
	createQueryLookup("SELECT project_id AS value, project_name AS label FROM projects ORDER BY project_name", {
		criteriaMultiple: false,
		insert: false,
		update: false,
	});

const employmentStatusLookup = () =>
	createFunctionDataLookup(
		`() => ({
	success: true,
	data: [
		{ value: "ACTIVE", label: "Active" },
		{ value: "ON_LEAVE", label: "On leave" },
		{ value: "TERMINATED", label: "Terminated" }
	]
})`,
		{ criteriaMultiple: false, insert: false, update: false },
	);

const projectStatusLookup = () =>
	createFunctionDataLookup(
		`() => ({
	success: true,
	data: [
		{ value: "PLANNED", label: "Planned" },
		{ value: "ACTIVE", label: "Active" },
		{ value: "ON_HOLD", label: "On hold" },
		{ value: "COMPLETED", label: "Completed" },
		{ value: "CANCELLED", label: "Cancelled" }
	]
})`,
		{ criteriaMultiple: false, insert: false, update: false },
	);

export function createOrganizationAnalysisItemData(): SeedMenuItemData[] {
	const params = createAnalysisParams();

	return [
		createConfiguredItemData("department-analysis", "Department Analysis", "chart-pie", "#0f766e", params.departments),
		createConfiguredItemData("employee-analysis", "Employee Analysis", "chart-line", "#2563eb", params.employees),
		createConfiguredItemData("project-analysis", "Project Analysis", "chart-column", "#7c3aed", params.projects),
	];
}

function createAnalysisParams() {
	const departments = parseMenuItemParams({
		tableName: "spc_department_analysis",
		columns: [
			analysisColumn("department_id", "Department", "number", {
				primaryKey: true,
				criteriaEnabled: true,
				operators: ["equals"],
				defaultOperator: "equals",
				lookup: departmentLookup(),
			}),
			analysisColumn("include_inactive", "Include inactive employees", "boolean", {
				visible: false,
				sortable: false,
				filterable: false,
				criteriaEnabled: true,
				operators: ["equals"],
				defaultOperator: "equals",
			}),
			analysisColumn("department_name", "Department", "text"),
			analysisColumn("location", "Location", "text"),
			analysisColumn("annual_budget", "Annual budget", "number"),
			analysisColumn("employee_count", "Employees", "number"),
			analysisColumn("active_employee_count", "Active employees", "number"),
			analysisColumn("total_salary_cost", "Total salary cost", "number"),
			analysisColumn("average_salary", "Average salary", "number"),
			analysisColumn("min_salary", "Minimum salary", "number"),
			analysisColumn("max_salary", "Maximum salary", "number"),
			analysisColumn("project_count", "Projects", "number"),
			analysisColumn("active_project_count", "Active projects", "number"),
			analysisColumn("total_project_budget", "Total project budget", "number"),
			analysisColumn("salary_budget_percent", "Salary / budget %", "number"),
		],
		handlers: {
			select: {
				kind: "query",
				src: "EXEC spc_department_analysis @include_inactive = 0",
			},
		},
		permissions: readOnlyPermissions(),
		children: [],
	});

	const employees = parseMenuItemParams({
		tableName: "spc_employee_analysis",
		columns: [
			analysisColumn("employee_id", "Employee", "number", {
				primaryKey: true,
				criteriaEnabled: true,
				criteriaRequired: true,
				operators: ["equals"],
				defaultOperator: "equals",
				lookup: employeeLookup(),
			}),
			analysisColumn("department_id", "Department", "number", {
				criteriaEnabled: true,
				operators: ["equals"],
				defaultOperator: "equals",
				lookup: departmentLookup(),
			}),
			analysisColumn("employment_status", "Employment status", "text", {
				criteriaEnabled: true,
				operators: ["equals"],
				defaultOperator: "equals",
				lookup: employmentStatusLookup(),
			}),
			analysisColumn("employee_name", "Employee name", "text"),
			analysisColumn("email", "Email", "text"),
			analysisColumn("phone", "Phone", "text"),
			analysisColumn("hire_date", "Hire date", "date"),
			analysisColumn("department_name", "Department name", "text"),
			analysisColumn("job_title_id", "Job title ID", "number"),
			analysisColumn("job_title_name", "Job title", "text"),
			analysisColumn("salary", "Salary", "number"),
			analysisColumn("min_salary", "Minimum salary", "number"),
			analysisColumn("max_salary", "Maximum salary", "number"),
			analysisColumn("salary_position_percent", "Salary position %", "number"),
			analysisColumn("salary_range_status", "Salary range status", "text"),
			analysisColumn("manager_name", "Manager", "text"),
			analysisColumn("years_employed", "Years employed", "number"),
			analysisColumn("project_count", "Projects", "number"),
			analysisColumn("active_project_count", "Active projects", "number"),
			analysisColumn("total_allocation_percent", "Total allocation %", "number"),
			analysisColumn("allocation_status", "Allocation status", "text"),
			analysisColumn("estimated_monthly_project_cost", "Estimated monthly project cost", "number"),
		],
		handlers: {
			select: {
				kind: "query",
				src: "EXEC spc_employee_analysis @employee_id = @{employee_id}, @EMPLOYMENT_STATUS = NULL",
			},
		},
		permissions: readOnlyPermissions(),
		children: [],
	});

	const projects = parseMenuItemParams({
		tableName: "spc_project_analysis",
		columns: [
			analysisColumn("project_id", "Project", "number", {
				primaryKey: true,
				criteriaEnabled: true,
				operators: ["equals"],
				defaultOperator: "equals",
				lookup: projectLookup(),
			}),
			analysisColumn("department_id", "Department", "number", {
				criteriaEnabled: true,
				operators: ["equals"],
				defaultOperator: "equals",
				lookup: departmentLookup(),
			}),
			analysisColumn("project_status", "Project status", "text", {
				criteriaEnabled: true,
				operators: ["equals"],
				defaultOperator: "equals",
				lookup: projectStatusLookup(),
			}),
			analysisColumn("project_name", "Project name", "text"),
			analysisColumn("department_name", "Department name", "text"),
			analysisColumn("start_date", "Start date", "date"),
			analysisColumn("end_date", "End date", "date"),
			analysisColumn("budget", "Budget", "number"),
			analysisColumn("project_duration_days", "Duration (days)", "number"),
			analysisColumn("assigned_employee_count", "Assigned employees", "number"),
			analysisColumn("total_allocation_percent", "Total allocation %", "number"),
			analysisColumn("average_allocation_percent", "Average allocation %", "number"),
			analysisColumn("estimated_monthly_labor_cost", "Estimated monthly labor cost", "number"),
			analysisColumn("estimated_annual_labor_cost", "Estimated annual labor cost", "number"),
			analysisColumn("projected_budget_usage_percent", "Projected budget usage %", "number"),
			analysisColumn("resource_status", "Resource status", "text"),
			analysisColumn("budget_status", "Budget status", "text"),
		],
		handlers: {
			select: {
				kind: "query",
				src: "EXEC spc_project_analysis @department_id = NULL, @project_status = NULL",
			},
		},
		permissions: readOnlyPermissions(),
		children: [],
	});

	for (const params of [departments, employees, projects]) {
		transformMenuItemParams(params);
	}

	return { departments, employees, projects };
}

function analysisColumn(
	name: string,
	label: string,
	type: SeedColumn["type"],
	options: SeedColumnOptions = {},
): SeedColumn {
	return createColumn(name, label, type, {
		insertEnabled: false,
		updateEnabled: false,
		criteriaEnabled: false,
		...options,
	});
}

function readOnlyPermissions() {
	return {
		insert: false,
		update: false,
		delete: false,
	};
}
