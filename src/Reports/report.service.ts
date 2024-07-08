import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto, UpdateReportDto } from './dto/create-report.dto';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) {}

  async create(reportData: CreateReportDto): Promise<Report> {
    const report = new Report();
    report.title = reportData.title;
    report.content = reportData.content;
    report.createdDate = reportData.createdDate;

    try {
      return this.reportRepository.save(report);
    } catch (error) {
      throw error;
    }
  }

  findAll(): Promise<Report[]> {
    return this.reportRepository.find();
  }

  findOne(id: number): Promise<Report> {
    return this.reportRepository.findOne({ where: { id } });
  }

  async update(id: number, updateReportDto: UpdateReportDto): Promise<Report> {
    await this.reportRepository.update(id, updateReportDto);
    return this.reportRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.reportRepository.delete(id);
  }
}
