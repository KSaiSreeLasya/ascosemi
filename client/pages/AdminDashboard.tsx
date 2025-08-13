import { useState, useEffect } from 'react'
import { Eye, Download, Users, Briefcase, Mail, Filter, Search } from 'lucide-react'
import Header from '../components/Header'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'

interface Application {
  id: string
  full_name: string
  email: string
  phone: string
  position: string
  experience: string
  cover_letter: string
  resume_url: string
  status: string
  created_at: string
}

interface Contact {
  id: string
  name: string
  email: string
  phone: string
  company: string
  message: string
  created_at: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [activeTab, setActiveTab] = useState<'applications' | 'contacts'>('applications')
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch applications
      const { data: applicationsData, error: appsError } = await supabase
        .from('job_applications')
        .select('*')
        .order('created_at', { ascending: false })

      if (appsError) throw appsError
      setApplications(applicationsData || [])

      // Fetch contacts
      const { data: contactsData, error: contactsError } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false })

      if (contactsError) throw contactsError
      setContacts(contactsData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateApplicationStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      
      setApplications(prev => 
        prev.map(app => app.id === id ? { ...app, status } : app)
      )
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.full_name.toLowerCase().includes(filter.toLowerCase()) ||
                         app.email.toLowerCase().includes(filter.toLowerCase()) ||
                         app.position.toLowerCase().includes(filter.toLowerCase())
    const matchesStatus = !statusFilter || app.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase()) ||
    contact.email.toLowerCase().includes(filter.toLowerCase()) ||
    contact.company?.toLowerCase().includes(filter.toLowerCase())
  )

  // Basic admin check - in a real app you'd have proper role management
  if (!user || !user.email?.includes('admin')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-tech-dark via-primary/10 to-background">
        <Header />
        <div className="pt-20 pb-16 px-4">
          <div className="container mx-auto max-w-2xl text-center">
            <div className="bg-card-bg border border-border-subtle rounded-xl p-12">
              <h1 className="text-3xl font-bold text-foreground mb-4">Access Denied</h1>
              <p className="text-foreground/70">
                You don't have permission to access the admin dashboard.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-tech-dark via-primary/10 to-background">
      <Header />
      
      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-foreground/70">
              Manage job applications and contact inquiries
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card-bg border border-border-subtle rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="bg-tech-blue/10 p-3 rounded-lg">
                  <Briefcase className="w-6 h-6 text-tech-blue" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{applications.length}</h3>
                  <p className="text-foreground/70">Total Applications</p>
                </div>
              </div>
            </div>

            <div className="bg-card-bg border border-border-subtle rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {applications.filter(app => app.status === 'pending').length}
                  </h3>
                  <p className="text-foreground/70">Pending Review</p>
                </div>
              </div>
            </div>

            <div className="bg-card-bg border border-border-subtle rounded-xl p-6">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">{contacts.length}</h3>
                  <p className="text-foreground/70">Contact Messages</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-card-bg border border-border-subtle rounded-xl mb-6">
            <div className="flex">
              <button
                onClick={() => setActiveTab('applications')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'applications'
                    ? 'bg-primary text-primary-foreground rounded-l-xl'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                Job Applications ({applications.length})
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === 'contacts'
                    ? 'bg-primary text-primary-foreground rounded-r-xl'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                Contact Messages ({contacts.length})
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-card-bg border border-border-subtle rounded-xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
                  <input
                    type="text"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    placeholder="Search by name, email, position..."
                    className="w-full pl-12 pr-4 py-3 border border-border-subtle rounded-lg bg-background/50 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-tech-blue"
                  />
                </div>
              </div>
              
              {activeTab === 'applications' && (
                <div className="sm:w-48">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full py-3 px-4 border border-border-subtle rounded-lg bg-background/50 text-foreground focus:outline-none focus:ring-2 focus:ring-tech-blue"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="bg-card-bg border border-border-subtle rounded-xl">
            {loading ? (
              <div className="p-12 text-center">
                <div className="w-8 h-8 border-2 border-tech-blue/30 border-t-tech-blue rounded-full animate-spin mx-auto mb-4" />
                <p className="text-foreground/70">Loading...</p>
              </div>
            ) : activeTab === 'applications' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border-subtle">
                    <tr>
                      <th className="px-6 py-4 text-left text-foreground font-medium">Applicant</th>
                      <th className="px-6 py-4 text-left text-foreground font-medium">Position</th>
                      <th className="px-6 py-4 text-left text-foreground font-medium">Experience</th>
                      <th className="px-6 py-4 text-left text-foreground font-medium">Status</th>
                      <th className="px-6 py-4 text-left text-foreground font-medium">Applied</th>
                      <th className="px-6 py-4 text-left text-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((app) => (
                      <tr key={app.id} className="border-b border-border-subtle/50 hover:bg-background/50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-foreground">{app.full_name}</div>
                            <div className="text-sm text-foreground/70">{app.email}</div>
                            <div className="text-sm text-foreground/70">{app.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-foreground">{app.position}</td>
                        <td className="px-6 py-4 text-foreground">{app.experience}</td>
                        <td className="px-6 py-4">
                          <select
                            value={app.status}
                            onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                            className="bg-background border border-border-subtle rounded px-3 py-1 text-sm text-foreground"
                          >
                            <option value="pending">Pending</option>
                            <option value="reviewing">Reviewing</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-foreground/70 text-sm">
                          {new Date(app.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {app.resume_url && (
                              <a
                                href={app.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-tech-blue/10 text-tech-blue rounded-lg hover:bg-tech-blue/20 transition-colors"
                                title="Download Resume"
                              >
                                <Download className="w-4 h-4" />
                              </a>
                            )}
                            <button
                              onClick={() => {/* Add view details modal */}}
                              className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredApplications.length === 0 && (
                  <div className="p-12 text-center text-foreground/70">
                    No applications found.
                  </div>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-border-subtle">
                    <tr>
                      <th className="px-6 py-4 text-left text-foreground font-medium">Contact</th>
                      <th className="px-6 py-4 text-left text-foreground font-medium">Company</th>
                      <th className="px-6 py-4 text-left text-foreground font-medium">Message</th>
                      <th className="px-6 py-4 text-left text-foreground font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredContacts.map((contact) => (
                      <tr key={contact.id} className="border-b border-border-subtle/50 hover:bg-background/50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium text-foreground">{contact.name}</div>
                            <div className="text-sm text-foreground/70">{contact.email}</div>
                            {contact.phone && (
                              <div className="text-sm text-foreground/70">{contact.phone}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-foreground">{contact.company || '-'}</td>
                        <td className="px-6 py-4 text-foreground max-w-xs truncate" title={contact.message}>
                          {contact.message}
                        </td>
                        <td className="px-6 py-4 text-foreground/70 text-sm">
                          {new Date(contact.created_at).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredContacts.length === 0 && (
                  <div className="p-12 text-center text-foreground/70">
                    No contact messages found.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
