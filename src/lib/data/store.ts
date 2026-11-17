import { 
  Community, 
  Event, 
  Business, 
  Place, 
  Announcement, 
  IssueReport, 
  Post, 
  Comment,
  Profile,
  ModerationReport,
  AuditLog
} from "@/types/database";
import { 
  initialCommunities, 
  initialProfiles, 
  initialEvents, 
  initialBusinesses, 
  initialPlaces, 
  initialAnnouncements, 
  initialIssueReports, 
  initialPosts 
} from "./initialData";

class DataStore {
  private communities: Community[] = [...initialCommunities];
  private profiles: Profile[] = [...initialProfiles];
  private events: Event[] = [...initialEvents];
  private businesses: Business[] = [...initialBusinesses];
  private places: Place[] = [...initialPlaces];
  private announcements: Announcement[] = [...initialAnnouncements];
  private issueReports: IssueReport[] = [...initialIssueReports];
  private posts: Post[] = [...initialPosts];
  private comments: Comment[] = [
    {
      id: "c0000000-0000-0000-0000-000000000001",
      post_id: "post000-0000-0000-0000-000000000001",
      author_id: "u0000000-0000-0000-0000-000000000001",
      content: "Great initiative Anupama! Can we add a small sign board for segregation guidelines?",
      status: "published",
      created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    }
  ];
  private moderationReports: ModerationReport[] = [];
  private auditLogs: AuditLog[] = [];

  // COMMUNITIES
  getCommunities(district?: string): Community[] {
    if (!district || district === "All") {
      return this.communities;
    }
    return this.communities.filter(c => c.district.toLowerCase() === district.toLowerCase());
  }

  getCommunityById(id: string): Community | undefined {
    return this.communities.find(c => c.id === id);
  }

  getCommunityBySlug(slug: string): Community | undefined {
    return this.communities.find(c => c.slug === slug);
  }

  // POSTS
  getPosts(communityId?: string): Post[] {
    let list = this.posts.filter(p => p.status === "published");
    if (communityId) {
      list = list.filter(p => p.community_id === communityId);
    }
    // enrich with author & community
    return list
      .map(p => ({
        ...p,
        author: this.profiles.find(u => u.id === p.author_id),
        community: this.communities.find(c => c.id === p.community_id),
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  createPost(data: { community_id: string; author_id: string; content: string; media_urls?: string[] }): Post {
    const newPost: Post = {
      id: "post-" + Date.now(),
      community_id: data.community_id,
      author_id: data.author_id,
      content: data.content,
      media_urls: data.media_urls || [],
      likes_count: 0,
      comments_count: 0,
      is_pinned: false,
      status: "published",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: this.profiles.find(u => u.id === data.author_id),
      community: this.communities.find(c => c.id === data.community_id),
    };
    this.posts.unshift(newPost);
    this.addAuditLog(data.author_id, "CREATE_POST", "post", newPost.id);
    return newPost;
  }

  deletePost(id: string, actorId: string): boolean {
    const idx = this.posts.findIndex(p => p.id === id);
    if (idx !== -1) {
      this.posts.splice(idx, 1);
      this.addAuditLog(actorId, "DELETE_POST", "post", id);
      return true;
    }
    return false;
  }

  // COMMENTS
  getComments(postId: string): Comment[] {
    return this.comments
      .filter(c => c.post_id === postId && c.status === "published")
      .map(c => ({
        ...c,
        author: this.profiles.find(u => u.id === c.author_id),
      }))
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }

  createComment(postId: string, authorId: string, content: string): Comment {
    const comment: Comment = {
      id: "comment-" + Date.now(),
      post_id: postId,
      author_id: authorId,
      content,
      status: "published",
      created_at: new Date().toISOString(),
      author: this.profiles.find(u => u.id === authorId),
    };
    this.comments.push(comment);

    const post = this.posts.find(p => p.id === postId);
    if (post) {
      post.comments_count = (post.comments_count || 0) + 1;
    }

    return comment;
  }

  // EVENTS
  getEvents(communityId?: string, category?: string, onlyApproved = true): Event[] {
    let list = this.events;
    if (onlyApproved) {
      list = list.filter(e => e.status === "approved");
    }
    if (communityId) {
      list = list.filter(e => e.community_id === communityId);
    }
    if (category && category !== "All") {
      list = list.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }
    return list
      .map(e => ({
        ...e,
        community: this.communities.find(c => c.id === e.community_id),
        creator: this.profiles.find(u => u.id === e.creator_id),
      }))
      .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());
  }

  getEventById(id: string): Event | undefined {
    const event = this.events.find(e => e.id === id);
    if (!event) return undefined;
    return {
      ...event,
      community: this.communities.find(c => c.id === event.community_id),
      creator: this.profiles.find(u => u.id === event.creator_id),
    };
  }

  createEvent(eventData: Omit<Event, "id" | "created_at" | "status">): Event {
    const newEvent: Event = {
      ...eventData,
      id: "event-" + Date.now(),
      status: "approved", // auto-approve in demo mode or pending in production
      created_at: new Date().toISOString(),
      community: this.communities.find(c => c.id === eventData.community_id),
    };
    this.events.push(newEvent);
    this.addAuditLog(eventData.creator_id, "SUBMIT_EVENT", "event", newEvent.id);
    return newEvent;
  }

  updateEventStatus(id: string, status: Event['status'], reason?: string, actorId?: string): boolean {
    const e = this.events.find(item => item.id === id);
    if (e) {
      e.status = status;
      if (reason) e.rejection_reason = reason;
      this.addAuditLog(actorId, "UPDATE_EVENT_STATUS", "event", id, { status, reason });
      return true;
    }
    return false;
  }

  // BUSINESSES (SERVICES)
  getBusinesses(communityId?: string, category?: string, onlyApproved = true): Business[] {
    let list = this.businesses;
    if (onlyApproved) {
      list = list.filter(b => b.status === "approved");
    }
    if (communityId) {
      list = list.filter(b => b.community_id === communityId);
    }
    if (category && category !== "All") {
      list = list.filter(b => b.category.toLowerCase() === category.toLowerCase());
    }
    return list
      .map(b => ({
        ...b,
        community: this.communities.find(c => c.id === b.community_id),
      }))
      .sort((a, b) => (b.is_verified ? 1 : 0) - (a.is_verified ? 1 : 0));
  }

  getBusinessById(id: string): Business | undefined {
    const b = this.businesses.find(item => item.id === id);
    if (!b) return undefined;
    return {
      ...b,
      community: this.communities.find(c => c.id === b.community_id),
    };
  }

  createBusiness(bizData: Omit<Business, "id" | "created_at" | "status" | "is_verified">): Business {
    const newBiz: Business = {
      ...bizData,
      id: "biz-" + Date.now(),
      is_verified: false,
      status: "approved",
      created_at: new Date().toISOString(),
      community: this.communities.find(c => c.id === bizData.community_id),
    };
    this.businesses.push(newBiz);
    this.addAuditLog(bizData.owner_id || "system", "REGISTER_BUSINESS", "business", newBiz.id);
    return newBiz;
  }

  updateBusinessStatus(id: string, status: Business['status'], verified?: boolean, actorId?: string): boolean {
    const b = this.businesses.find(item => item.id === id);
    if (b) {
      b.status = status;
      if (typeof verified === "boolean") b.is_verified = verified;
      this.addAuditLog(actorId, "UPDATE_BUSINESS_STATUS", "business", id, { status, verified });
      return true;
    }
    return false;
  }

  // PLACES
  getPlaces(communityId?: string): Place[] {
    let list = this.places;
    if (communityId) {
      list = list.filter(p => p.community_id === communityId);
    }
    return list.map(p => ({
      ...p,
      community: this.communities.find(c => c.id === p.community_id),
    }));
  }

  // ANNOUNCEMENTS
  getAnnouncements(communityId?: string, onlyApproved = true): Announcement[] {
    let list = this.announcements;
    if (onlyApproved) {
      list = list.filter(a => a.status === "approved");
    }
    if (communityId) {
      list = list.filter(a => a.community_id === communityId);
    }
    return list
      .map(a => ({
        ...a,
        community: this.communities.find(c => c.id === a.community_id),
        publisher: this.profiles.find(u => u.id === a.publisher_id),
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  createAnnouncement(data: Omit<Announcement, "id" | "created_at" | "status">): Announcement {
    const announcement: Announcement = {
      ...data,
      id: "ann-" + Date.now(),
      status: "approved",
      created_at: new Date().toISOString(),
      community: this.communities.find(c => c.id === data.community_id),
      publisher: this.profiles.find(u => u.id === data.publisher_id),
    };
    this.announcements.unshift(announcement);
    this.addAuditLog(data.publisher_id, "PUBLISH_ANNOUNCEMENT", "announcement", announcement.id);
    return announcement;
  }

  // ISSUE REPORTS
  getIssueReports(communityId?: string, reporterId?: string): IssueReport[] {
    let list = this.issueReports;
    if (communityId) {
      list = list.filter(i => i.community_id === communityId);
    }
    if (reporterId) {
      list = list.filter(i => i.reporter_id === reporterId);
    }
    return list
      .map(i => ({
        ...i,
        community: this.communities.find(c => c.id === i.community_id),
        reporter: this.profiles.find(u => u.id === i.reporter_id),
      }))
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  getIssueReportById(id: string): IssueReport | undefined {
    const issue = this.issueReports.find(i => i.id === id);
    if (!issue) return undefined;
    return {
      ...issue,
      community: this.communities.find(c => c.id === issue.community_id),
      reporter: this.profiles.find(u => u.id === issue.reporter_id),
    };
  }

  createIssueReport(data: Omit<IssueReport, "id" | "created_at" | "status" | "status_updated_at">): IssueReport {
    const issue: IssueReport = {
      ...data,
      id: "issue-" + Date.now(),
      status: "submitted",
      status_updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      community: this.communities.find(c => c.id === data.community_id),
      reporter: this.profiles.find(u => u.id === data.reporter_id),
    };
    this.issueReports.unshift(issue);
    this.addAuditLog(data.reporter_id, "SUBMIT_ISSUE", "issue", issue.id);
    return issue;
  }

  updateIssueStatus(id: string, status: IssueReport['status'], officialResponse?: string, actorId?: string): boolean {
    const issue = this.issueReports.find(i => i.id === id);
    if (issue) {
      issue.status = status;
      if (officialResponse) issue.official_response = officialResponse;
      issue.status_updated_at = new Date().toISOString();
      issue.status_updated_by = actorId;
      this.addAuditLog(actorId, "UPDATE_ISSUE_STATUS", "issue", id, { status, officialResponse });
      return true;
    }
    return false;
  }

  // PROFILES & AUTH MOCK
  getProfiles(): Profile[] {
    return this.profiles;
  }

  getProfileById(id: string): Profile | undefined {
    return this.profiles.find(p => p.id === id);
  }

  updateProfile(id: string, updates: Partial<Profile>): Profile | undefined {
    const p = this.profiles.find(item => item.id === id);
    if (p) {
      Object.assign(p, updates, { updated_at: new Date().toISOString() });
      return p;
    }
    return undefined;
  }

  // AUDIT LOGS
  addAuditLog(actorId: string | undefined, action: string, targetType: string, targetId: string, details?: Record<string, any>) {
    this.auditLogs.unshift({
      id: "audit-" + Date.now(),
      actor_id: actorId || null,
      action,
      target_type: targetType,
      target_id: targetId,
      details: details || null,
      created_at: new Date().toISOString(),
    });
  }

  getAuditLogs(): AuditLog[] {
    return this.auditLogs.slice(0, 50);
  }
}

// Global Singleton
const globalForStore = globalThis as unknown as { appStore: DataStore };
export const store = globalForStore.appStore || new DataStore();
if (process.env.NODE_ENV !== "production") globalForStore.appStore = store;
