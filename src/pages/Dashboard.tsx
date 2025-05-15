// src/pages/Dashboard.tsx
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VulnerabilityTable } from "@/components/VulnerabilityTable"
import { VulnerabilityChart } from "@/components/VulnerabilityChart"

interface Vulnerability {
  cve: string
  description: string
  severity: string
  dateDetected: string
}

const allVulnerabilities: Vulnerability[] = [
  { cve: "CVE-2023-21768", description: "Windows Kernel Elevation of Privilege Vulnerability", severity: "Alta", dateDetected: "2023-01-12" },
]

export default function Dashboard() {
  const [vulns, setVulns] = useState<Vulnerability[]>(allVulnerabilities.slice(0, 3))
  const [filter, setFilter] = useState("Todos")

  const filtered = filter === "Todos"
    ? vulns
    : vulns.filter(v => v.severity === filter)

  return (
    <div className="p-6 space-y-6">
      {/* Métricas superiores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        <Card className={vulns.length === 0 ? "bg-white" : "bg-muted"}>
  <CardHeader>
    <CardTitle>Total Vulnerabilidades</CardTitle>
    <p className="text-2xl font-bold ">{vulns.length}</p>
    <p className="text-sm text-muted-foreground">Datos actuales</p>
  </CardHeader>
</Card>

<Card className={vulns.filter(v => v.severity === "Crítica").length === 0 ? "bg-white" : "bg-red-100"}>
  <CardHeader>
    <CardTitle className="dark:text-black">Críticas</CardTitle>
    <p className="text-2xl font-bold dark:text-black">{vulns.filter(v => v.severity === "Crítica").length}</p>
  </CardHeader>
</Card>

<Card className={vulns.filter(v => v.severity === "Alta").length === 0 ? "bg-white" : "bg-orange-100"}>
  <CardHeader>
    <CardTitle className="dark:text-black">Altas</CardTitle>
    <p className="text-2xl font-bold dark:text-black">{vulns.filter(v => v.severity === "Alta").length}</p>
  </CardHeader>
</Card>

<Card className={vulns.filter(v => v.severity === "Media").length === 0 ? "bg-white" : "bg-yellow-100"}>
  <CardHeader>
    <CardTitle className="dark:text-black">Medias</CardTitle>
    <p className="text-2xl font-bold dark:text-black">{vulns.filter(v => v.severity === "Media").length}</p>
  </CardHeader>
</Card>

<Card className={vulns.filter(v => v.severity === "Baja").length === 0 ? "bg-white" : "bg-green-100"}>
  <CardHeader>
    <CardTitle className="dark:text-black">Bajas</CardTitle>
    <p className="text-2xl font-bold dark:text-black">{vulns.filter(v => v.severity === "Baja").length}</p>
  </CardHeader>
</Card>

      </div>

      {/* Gráfico y tabla */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 items-start">
        {/* Gráfico con altura fija */}
        <div className="rounded-xl border bg-card text-card-foreground shadow col-span-3 h-fit">
          <Card>
            <CardHeader>
              <CardTitle>Distribución por severidad</CardTitle>
            </CardHeader>
            <CardContent>
              <VulnerabilityChart vulnerabilities={filtered} />
            </CardContent>
          </Card>
        </div>

        {/* Tabla */}
        <div className="rounded-xl border bg-card text-card-foreground shadow col-span-4">
          <VulnerabilityTable data={filtered} setData={setVulns} filter={filter} setFilter={setFilter} />
        </div>
      </div>
    </div>
  )
}
