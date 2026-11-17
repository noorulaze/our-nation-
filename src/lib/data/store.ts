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
  AuditLog,
  NewsArticleEntity,
  Institution,
  PublicService,
  PublicRepresentative,
  CulturalHeritageItem
} from "@/types/database";
import { 
  initialCommunities, 
  initialProfiles, 
  initialEvents, 
  initialBusinesses, 
  initialPlaces, 
  initialAnnouncements, 
  initialIssueReports, 
  initialPosts,
  initialNewsArticles,
  initialInstitutions,
  initialPublicServices,
  initialRepresentatives,
  initialCulturalItems
} from "./initialData";

class DataStore {
  private communities: Community[] = [...initialCommunities];
  private profiles: Profile[] = [...initialProfiles];
  private events: Event[] = [...initialEvents];
  private businesses: Business[] = [...initialBusinesses];
  private places: Place[] = [...initialPlaces];
  private announcements: Announcement[] = [...initialAnnouncements];
  private newsArticles: NewsArticleEntity[] = [...initialNewsArticles];
  private institutions: Institution[] = [...initialInstitutions];
  private publicServices: PublicService[] = [...initialPublicServices];
  private representatives: PublicRepresentative[] = [...initialRepresentatives];
  private culturalItems: CulturalHeritageItem[] = [...initialCulturalItems];
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
  getEvents(communityId?: string, category?: string, onlyApproved = true, includeArchived = false): Event[] {
    let list = this.events;
    if (!includeArchived) {
      list = list.filter(e => !e.archived);
    }
    if (onlyApproved) {
      list = list.filter(e => e.status === "approved");
    }
    if (communityId) {
      list = list.filter(e => e.community_id === communityId);
    }
    if (category && category !== "All" && category !== "എല്ലാം") {
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
      status: "approved", // default approved in local state
      is_verified: false,
      is_community_submitted: true,
      archived: false,
      created_at: new Date().toISOString(),
      community: this.communities.find(c => c.id === eventData.community_id),
    };
    this.events.push(newEvent);
    this.addAuditLog(eventData.creator_id, "SUBMIT_EVENT", "event", newEvent.id);
    return newEvent;
  }

  updateEvent(id: string, updates: Partial<Event>, actorId?: string): boolean {
    const e = this.events.find(item => item.id === id);
    if (e) {
      Object.assign(e, updates);
      this.addAuditLog(actorId, "UPDATE_EVENT", "event", id, updates);
      return true;
    }
    return false;
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

  archiveEvent(id: string, actorId?: string): boolean {
    const e = this.events.find(item => item.id === id);
    if (e) {
      e.archived = true;
      this.addAuditLog(actorId, "ARCHIVE_EVENT", "event", id);
      return true;
    }
    return false;
  }

  // BUSINESSES (SERVICES)
  getBusinesses(communityId?: string, category?: string, onlyApproved = true, includeArchived = false): Business[] {
    let list = this.businesses;
    if (!includeArchived) {
      list = list.filter(b => !b.archived);
    }
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
      is_community_submitted: true,
      status: "approved",
      archived: false,
      created_at: new Date().toISOString(),
      community: this.communities.find(c => c.id === bizData.community_id),
    };
    this.businesses.push(newBiz);
    this.addAuditLog(bizData.owner_id || "system", "REGISTER_BUSINESS", "business", newBiz.id);
    return newBiz;
  }

  updateBusiness(id: string, updates: Partial<Business>, actorId?: string): boolean {
    const b = this.businesses.find(item => item.id === id);
    if (b) {
      Object.assign(b, updates);
      this.addAuditLog(actorId, "UPDATE_BUSINESS", "business", id, updates);
      return true;
    }
    return false;
  }

  updateBusinessStatus(id: string, status: Business['status'], verified?: boolean, actorId?: string): boolean {
    const b = this.businesses.find(item => item.id === id);
    if (b) {
      b.status = status;
      if (typeof verified === "boolean") {
        b.is_verified = verified;
        if (verified) b.verified_at = new Date().toISOString().split("T")[0];
      }
      this.addAuditLog(actorId, "UPDATE_BUSINESS_STATUS", "business", id, { status, verified });
      return true;
    }
    return false;
  }

  archiveBusiness(id: string, actorId?: string): boolean {
    const b = this.businesses.find(item => item.id === id);
    if (b) {
      b.archived = true;
      this.addAuditLog(actorId, "ARCHIVE_BUSINESS", "business", id);
      return true;
    }
    return false;
  }

  // NEWS ARTICLES
  getNewsArticles(communityId?: string, onlyApproved = true, includeArchived = false): NewsArticleEntity[] {
    let list = this.newsArticles;
    if (!includeArchived) {
      list = list.filter(n => !n.archived);
    }
    if (onlyApproved) {
      list = list.filter(n => n.status === "approved");
    }
    if (communityId) {
      list = list.filter(n => n.community_id === communityId);
    }
    return list.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  getNewsArticleById(id: string): NewsArticleEntity | undefined {
    return this.newsArticles.find(n => n.id === id);
  }

  createNewsArticle(data: Omit<NewsArticleEntity, "id" | "created_at" | "archived">, actorId?: string): NewsArticleEntity {
    const item: NewsArticleEntity = {
      ...data,
      id: "news-" + Date.now(),
      archived: false,
      created_at: new Date().toISOString(),
    };
    this.newsArticles.unshift(item);
    this.addAuditLog(actorId, "CREATE_NEWS_ARTICLE", "news", item.id);
    return item;
  }

  updateNewsArticle(id: string, updates: Partial<NewsArticleEntity>, actorId?: string): boolean {
    const n = this.newsArticles.find(item => item.id === id);
    if (n) {
      Object.assign(n, updates);
      this.addAuditLog(actorId, "UPDATE_NEWS_ARTICLE", "news", id, updates);
      return true;
    }
    return false;
  }

  archiveNewsArticle(id: string, actorId?: string): boolean {
    const n = this.newsArticles.find(item => item.id === id);
    if (n) {
      n.archived = true;
      n.status = "archived";
      this.addAuditLog(actorId, "ARCHIVE_NEWS_ARTICLE", "news", id);
      return true;
    }
    return false;
  }

  // INSTITUTIONS
  getInstitutions(communityId?: string, type?: string, includeArchived = false): Institution[] {
    let list = this.institutions;
    if (!includeArchived) {
      list = list.filter(i => !i.archived);
    }
    if (communityId) {
      list = list.filter(i => i.community_id === communityId);
    }
    if (type && type !== "All" && type !== "എല്ലാം") {
      list = list.filter(i => i.type.toLowerCase() === type.toLowerCase());
    }
    return list.sort((a, b) => (b.is_verified ? 1 : 0) - (a.is_verified ? 1 : 0));
  }

  getInstitutionById(id: string): Institution | undefined {
    return this.institutions.find(i => i.id === id);
  }

  createInstitution(data: Omit<Institution, "id" | "created_at" | "archived">, actorId?: string): Institution {
    const item: Institution = {
      ...data,
      id: "inst-" + Date.now(),
      archived: false,
      created_at: new Date().toISOString(),
    };
    this.institutions.push(item);
    this.addAuditLog(actorId, "CREATE_INSTITUTION", "institution", item.id);
    return item;
  }

  updateInstitution(id: string, updates: Partial<Institution>, actorId?: string): boolean {
    const item = this.institutions.find(i => i.id === id);
    if (item) {
      Object.assign(item, updates);
      this.addAuditLog(actorId, "UPDATE_INSTITUTION", "institution", id, updates);
      return true;
    }
    return false;
  }

  archiveInstitution(id: string, actorId?: string): boolean {
    const item = this.institutions.find(i => i.id === id);
    if (item) {
      item.archived = true;
      this.addAuditLog(actorId, "ARCHIVE_INSTITUTION", "institution", id);
      return true;
    }
    return false;
  }

  // PUBLIC SERVICES & EMERGENCY
  getPublicServices(communityId?: string, category?: string, includeArchived = false): PublicService[] {
    let list = this.publicServices;
    if (!includeArchived) {
      list = list.filter(s => !s.archived);
    }
    if (communityId) {
      list = list.filter(s => s.community_id === communityId);
    }
    if (category && category !== "all" && category !== "All") {
      list = list.filter(s => s.category.toLowerCase() === category.toLowerCase());
    }
    return list;
  }

  getPublicServiceById(id: string): PublicService | undefined {
    return this.publicServices.find(s => s.id === id);
  }

  createPublicService(data: Omit<PublicService, "id" | "created_at" | "archived">, actorId?: string): PublicService {
    const item: PublicService = {
      ...data,
      id: "srv-" + Date.now(),
      archived: false,
      created_at: new Date().toISOString(),
    };
    this.publicServices.push(item);
    this.addAuditLog(actorId, "CREATE_PUBLIC_SERVICE", "service", item.id);
    return item;
  }

  updatePublicService(id: string, updates: Partial<PublicService>, actorId?: string): boolean {
    const item = this.publicServices.find(s => s.id === id);
    if (item) {
      Object.assign(item, updates);
      this.addAuditLog(actorId, "UPDATE_PUBLIC_SERVICE", "service", id, updates);
      return true;
    }
    return false;
  }

  archivePublicService(id: string, actorId?: string): boolean {
    const item = this.publicServices.find(s => s.id === id);
    if (item) {
      item.archived = true;
      this.addAuditLog(actorId, "ARCHIVE_PUBLIC_SERVICE", "service", id);
      return true;
    }
    return false;
  }

  // PUBLIC REPRESENTATIVES
  getRepresentatives(communityId?: string): PublicRepresentative[] {
    if (communityId) {
      return this.representatives.filter(r => r.community_id === communityId);
    }
    return this.representatives;
  }

  getRepresentativeById(id: string): PublicRepresentative | undefined {
    return this.representatives.find(r => r.id === id);
  }

  updateRepresentative(id: string, updates: Partial<PublicRepresentative>, actorId?: string): boolean {
    const item = this.representatives.find(r => r.id === id);
    if (item) {
      Object.assign(item, updates);
      this.addAuditLog(actorId, "UPDATE_REPRESENTATIVE", "representative", id, updates);
      return true;
    }
    return false;
  }

  // CULTURAL HERITAGE ITEMS
  getCulturalItems(communityId?: string): CulturalHeritageItem[] {
    if (communityId) {
      return this.culturalItems.filter(c => c.community_id === communityId);
    }
    return this.culturalItems;
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

  // PLACES MANAGEMENT
  updatePlace(id: string, updates: Partial<Place>, actorId?: string): boolean {
    const item = this.places.find(p => p.id === id);
    if (item) {
      Object.assign(item, updates);
      this.addAuditLog(actorId, "UPDATE_PLACE", "place", id, updates);
      return true;
    }
    return false;
  }

  archivePlace(id: string, actorId?: string): boolean {
    const item = this.places.find(p => p.id === id);
    if (item) {
      item.archived = true;
      this.addAuditLog(actorId, "ARCHIVE_PLACE", "place", id);
      return true;
    }
    return false;
  }

  // ANNOUNCEMENTS MANAGEMENT
  updateAnnouncement(id: string, updates: Partial<Announcement>, actorId?: string): boolean {
    const item = this.announcements.find(a => a.id === id);
    if (item) {
      Object.assign(item, updates);
      this.addAuditLog(actorId, "UPDATE_ANNOUNCEMENT", "announcement", id, updates);
      return true;
    }
    return false;
  }

  archiveAnnouncement(id: string, actorId?: string): boolean {
    const item = this.announcements.find(a => a.id === id);
    if (item) {
      item.archived = true;
      item.status = "expired";
      this.addAuditLog(actorId, "ARCHIVE_ANNOUNCEMENT", "announcement", id);
      return true;
    }
    return false;
  }

  // UNIFIED VERIFICATION HELPER
  verifyEntity(targetType: string, id: string, sourceUrl: string, sourceName: string, actorId?: string): boolean {
    const today = new Date().toISOString().split("T")[0];
    if (targetType === "event") {
      const e = this.events.find(item => item.id === id);
      if (e) {
        e.is_verified = true;
        e.source_url = sourceUrl;
        e.source_name = sourceName;
        e.verified_at = today;
        this.addAuditLog(actorId, "VERIFY_EVENT", "event", id, { sourceUrl, sourceName });
        return true;
      }
    } else if (targetType === "business") {
      const b = this.businesses.find(item => item.id === id);
      if (b) {
        b.is_verified = true;
        b.source_url = sourceUrl;
        b.source_name = sourceName;
        b.verified_at = today;
        this.addAuditLog(actorId, "VERIFY_BUSINESS", "business", id, { sourceUrl, sourceName });
        return true;
      }
    } else if (targetType === "news") {
      const n = this.newsArticles.find(item => item.id === id);
      if (n) {
        n.is_verified = true;
        n.source_url = sourceUrl;
        n.source_name = sourceName;
        n.verified_at = today;
        this.addAuditLog(actorId, "VERIFY_NEWS", "news", id, { sourceUrl, sourceName });
        return true;
      }
    } else if (targetType === "institution") {
      const inst = this.institutions.find(item => item.id === id);
      if (inst) {
        inst.is_verified = true;
        inst.source_url = sourceUrl;
        inst.source_name = sourceName;
        inst.verified_at = today;
        this.addAuditLog(actorId, "VERIFY_INSTITUTION", "institution", id, { sourceUrl, sourceName });
        return true;
      }
    } else if (targetType === "service") {
      const srv = this.publicServices.find(item => item.id === id);
      if (srv) {
        srv.is_verified = true;
        srv.source_url = sourceUrl;
        srv.source_name = sourceName;
        srv.verified_at = today;
        this.addAuditLog(actorId, "VERIFY_SERVICE", "service", id, { sourceUrl, sourceName });
        return true;
      }
    } else if (targetType === "issue") {
      const iss = this.issueReports.find(item => item.id === id);
      if (iss) {
        iss.is_verified = true;
        iss.source_url = sourceUrl;
        iss.verified_at = today;
        this.addAuditLog(actorId, "VERIFY_ISSUE", "issue", id, { sourceUrl, sourceName });
        return true;
      }
    }
    return false;
  }

  // PLATFORM VERIFICATION & HEALTH STATS
  getVerificationStats() {
    const totalNews = this.newsArticles.length;
    const verifiedNews = this.newsArticles.filter(n => n.is_verified).length;
    const totalEvents = this.events.length;
    const verifiedEvents = this.events.filter(e => e.is_verified).length;
    const totalBiz = this.businesses.length;
    const verifiedBiz = this.businesses.filter(b => b.is_verified).length;
    const totalInst = this.institutions.length;
    const verifiedInst = this.institutions.filter(i => i.is_verified).length;
    const totalSrv = this.publicServices.length;
    const verifiedSrv = this.publicServices.filter(s => s.is_verified).length;

    const totalRecords = totalNews + totalEvents + totalBiz + totalInst + totalSrv;
    const totalVerified = verifiedNews + verifiedEvents + verifiedBiz + verifiedInst + verifiedSrv;
    const percentVerified = totalRecords > 0 ? Math.round((totalVerified / totalRecords) * 100) : 100;

    const pendingSubmissions = 
      this.events.filter(e => e.status === "pending").length +
      this.businesses.filter(b => b.status === "pending").length +
      this.newsArticles.filter(n => n.status === "pending").length;

    return {
      totalRecords,
      totalVerified,
      percentVerified,
      pendingSubmissions,
      totalNews,
      verifiedNews,
      totalEvents,
      verifiedEvents,
      totalBiz,
      verifiedBiz,
      totalInst,
      verifiedInst,
      totalSrv,
      verifiedSrv,
    };
  }
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
